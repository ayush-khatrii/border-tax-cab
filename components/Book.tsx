"use client";
import { useState, useEffect } from "react";
import { states, borders, taxModes } from "@/constants";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerDemo as DatePicker } from "./ui/Date";
import { Button } from "./ui/button";
import { format } from "date-fns";
import Script from "next/script";
import { toast } from "sonner";
import { IoIosArrowRoundForward } from "react-icons/io";
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Book() {
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [bordersList, setBordersList] = useState<string[]>([]);
  const [price, setPrice] = useState("0");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [seatCapacity, setSeatCapacity] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [entryBorder, setEntryBorder] = useState("");
  const [isClosed, setIsClosed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [taxMode, setTaxMode] = useState("daily");

  const handleStateChange = (code: string) => {
    setState(code);
    setBordersList(borders[code] || []);
  };

  const calculateDays = (start: Date, end: Date) => {
    const diff = end.getTime() - start.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1);
  };

  useEffect(() => {
    if (startDate && endDate && state) {
      const tax = states.find((s) => s.code === state)?.borderTax || 0;
      const days = calculateDays(startDate, endDate);
      setPrice((days * tax).toString());
    }
  }, [startDate, endDate, state]);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsClosed(hour >= 0 && hour < 6);
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !state || !entryBorder || !seatCapacity || !whatsappNumber) {
      toast.error("Please fill all fields before proceeding.");
      return;
    }

    setIsProcessing(true);

    try {
      const res = await fetch("/api/create-order", { method: "POST" });
      const data = await res.json();

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Number(price) * 100,
        currency: "INR",
        name: "EasyTax",
        description: "Vehicle Border Entry Tax",
        order_id: data.id,
        callback_url: `${window.location.origin}/success`,
        prefill: {
          contact: whatsappNumber,
          name,
        },
        notes: {
          state,
          entryBorder,
          seatCapacity,
          startDate: format(startDate, "d MMM yyyy",),
          endDate: format(endDate, "d MMM yyyy"),
          taxMode,
        },
        theme: {
          color: "#4CAF50",
        },
        handler: function (response: any) {
          const data = response;
          console.log("Payment data::::", data);
          toast.success("Payment successful!");
        },
      });

      rzp.open();
    } catch (err) {
      toast.error("Payment failed. Try again.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="max-w-3xl w-full mx-auto px-4 py-10">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome to <span className="text-green-600">EasyTax</span>
      </h1>

      <form onSubmit={handlePayment} className="flex flex-col gap-3 w-full">
        <div>
          <Label className="my-2">Enter Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            type="text"
          />
        </div>
        <div>
          <Label className="my-2">Seat Capacity</Label>
          <Select value={seatCapacity} onValueChange={setSeatCapacity}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select seat capacity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="5">5 (4+1)</SelectItem>
                <SelectItem value="7">7 (6+1)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* WhatsApp Number */}
        <div>
          <Label className="my-2">WhatsApp Number</Label>
          <Input
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="+91 9876543210"
            type="tel"
          />
        </div>

        {/* Visiting State */}
        <div>
          <Label className="my-2">Visiting State</Label>
          <Select value={state} onValueChange={handleStateChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {states.map((s) => (
                  <SelectItem key={s.code} value={s.code}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Entry Border */}
        <div>
          <Label className="my-2">Entry Border</Label>
          <Select value={entryBorder} onValueChange={setEntryBorder}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select border" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {bordersList.map((b, i) => (
                  <SelectItem key={i} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="my-2">Seat Tax Mode</Label>
          <Select value={taxMode} onValueChange={setTaxMode}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select tax mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  taxModes?.map((t, i) => (
                    <SelectItem key={i} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="my-2">Start Date</Label>
            <DatePicker selectedDate={startDate} setSelectedDate={setStartDate} />
          </div>
          <div>
            <Label className="my-2">End Date</Label>
            <DatePicker selectedDate={endDate} setSelectedDate={setEndDate} />
          </div>
        </div>

        {/* Amount */}
        <div className="my-5">
          <p className="text-3xl font-bold">
            Total: <span className="text-green-600 font-bold">₹{price}</span>
          </p>
          {startDate && endDate && state && (
            <span className="my-3 text-muted-foreground flex items-center gap-3 font-normal text-sm mt-1">
              ({format(startDate, "d MMM yyyy")} - {format(endDate, "d MMM yyyy")} <IoIosArrowRoundForward /> {calculateDays(startDate, endDate)} day(s) × ₹{states.find(s => s.code === state)?.borderTax || 0}/day)
            </span>
          )}
        </div>

        {/* Button */}
        <div>
          {isClosed ? (
            <Button disabled variant="outline" className="w-full">
              Service unavailable (12AM–6AM)
            </Button>
          ) : (
            <Button type="submit" disabled={isProcessing || Number(price) <= 0} className="w-full">
              {isProcessing ? "Processing..." : "Pay Now"}
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}
