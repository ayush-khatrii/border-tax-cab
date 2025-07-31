"use client";
import { useState, useEffect } from "react";
import { borders, states } from "@/constants";
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
import { IoIosArrowRoundForward } from "react-icons/io";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Book() {
  const [state, setState] = useState<string>("");
  const [border, setBorder] = useState<string[]>([]);
  const [price, setPrice] = useState("0");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [seatCapacity, setSeatCapacity] = useState<string>("");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [taxMode, setTaxMode] = useState<string>("Daily");
  const [entryBorder, setEntryBorder] = useState<string>("");
  const [isClosed, setIsClosed] = useState(false);

  const ownerNumber = "+918200450219";

  const handleStateChange = (code: string) => {
    setState(code);
    setBorder(borders[code] || []);
  };

  const calculateDays = (start: Date, end: Date) => {
    const oneDay = 1000 * 60 * 60 * 24;
    const diff = Math.ceil((end.getTime() - start.getTime()) / oneDay);
    return diff <= 0 ? 1 : diff + 1;
  };

  useEffect(() => {
    if (startDate && endDate && state) {
      const selectedState = states.find((s) => s.code === state);
      const taxPerDay = selectedState?.borderTax || 0;
      const totalDays = calculateDays(startDate, endDate);
      const totalTax = taxPerDay * totalDays;
      setPrice(totalTax.toString());
    }
  }, [startDate, endDate, state]);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    setIsClosed(hour >= 0 && hour < 6);
  }, []);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    handleSendData();
  };

  const handleSendData = () => {
    if (!startDate || !endDate || !state || !entryBorder || !seatCapacity || !whatsappNumber) {
      alert("Please fill out all fields before proceeding.");
      return;
    }
    const selectedState = states.find((s) => s.code === state);
    const formattedStart = format(startDate, "d MMM yyyy");
    const formattedEnd = format(endDate, "d MMM yyyy");
    const totalDays = calculateDays(startDate, endDate);
    const taxPerDay = selectedState?.borderTax || 0;

    const message = `
*New Vehicle Tax Request* 🚗
-------------------------------
📍 *Visiting State:* ${selectedState?.name}
🚧 *Entry Border:* ${entryBorder}
🪑 *Seat Capacity:* ${seatCapacity}
📅 *Dates:* ${formattedStart} to ${formattedEnd}
📆 *Total Days:* ${totalDays}
💳 *Tax Mode:* ${taxMode}
📲 *User WhatsApp:* ${whatsappNumber}
💰 *Amount:* ₹${price} (${totalDays} x ₹${taxPerDay}/day)
`;

    const url = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="book" className="max-w-5xl mx-auto mt-10 px-5 lg:px-0 overflow-hidden ">
      <h1 className="text-xl md:text-3xl font-bold my-5 text-center">
        Welcome to
        <span className="text-primary px-2">EasyTax</span>
      </h1>
      <form className=" mt-5" onSubmit={handlePayment}>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-lg">Select Seat Capacity</Label>
            <Select value={seatCapacity} onValueChange={setSeatCapacity} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select seat capacity" />
              </SelectTrigger>
              <SelectContent className="w-full cursor-pointer">
                <SelectGroup>
                  <SelectLabel>Seat Capacity</SelectLabel>
                  <SelectItem value="5">5 (4+1)</SelectItem>
                  <SelectItem value="7">7 (6+1)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-lg">Enter Whatsapp Number</Label>
            <Input
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              required
              placeholder="+91 1234567890"
              className="w-full"
              type="number"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-lg">Select Visiting State</Label>
            <Select value={state} onValueChange={handleStateChange} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select visiting state" />
              </SelectTrigger>
              <SelectContent className="w-full border-2 cursor-pointer">
                <SelectGroup>
                  <SelectLabel>Select Visiting State</SelectLabel>
                  {states.map((place) => (
                    <SelectItem key={place.code} value={place.code}>
                      {place.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-lg">Select Tax Mode</Label>
            <Select value={taxMode} onValueChange={setTaxMode} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select tax mode" />
              </SelectTrigger>
              <SelectContent className="w-full border-2 cursor-pointer">
                <SelectGroup>
                  <SelectLabel>Tax Mode</SelectLabel>
                  <SelectItem value="Daily">Daily</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-lg">Select Entry Border</Label>
            <Select value={entryBorder} onValueChange={setEntryBorder} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select entry border" />
              </SelectTrigger>
              <SelectContent className="w-full border-2 cursor-pointer">
                <SelectGroup>
                  <SelectLabel>Select Entry Border</SelectLabel>
                  {border.map((b, idx) => (
                    <SelectItem key={idx} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label className="text-lg">Select Date</Label>
            <div className="grid grid-cols-2 gap-5 w-full">
              <div className="w-full">
                <span>Start Date:</span>
                <DatePicker selectedDate={startDate} setSelectedDate={setStartDate} />
              </div>
              <div className="w-full">
                <span>End Date:</span>
                <DatePicker selectedDate={endDate} setSelectedDate={setEndDate} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-col lg:justify-between justify-center items-center border-foreground/20 border-t">
          <div className="my-5 flex text-2xl justify-center items-center gap-4">
            <div className="flex flex-col items-center text-center">
              <h1 className="lg:text-2xl font-medium">Total Amount:</h1>
              <span className="text-primary text-3xl font-bold">{`₹${price}`}</span>
              {startDate && endDate && state && (
                <span className="text-muted-foreground flex items-center justify-center gap-3 font-normal text-sm mt-1">
                  ({format(startDate, "d MMM yyyy")} - {format(endDate, "d MMM yyyy")} <IoIosArrowRoundForward /> {calculateDays(startDate, endDate)} day(s) × ₹{states.find(s => s.code === state)?.borderTax || 0}/day)
                </span>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col gap-3 justify-center items-center">
            {
              isClosed ?
                <Button className="w-full" variant="outline" type="submit">
                  Send Message
                </Button>
                :
                <Button className="w-full" disabled={isClosed} type="submit">
                  Pay Now
                </Button>
            }
          </div>
        </div>
      </form>


      <Alert variant="destructive" className="mt-5">
        <AlertTitle>Notice!</AlertTitle>
        <AlertDescription>
          <p className="text-muted-foreground w-auto md:w-full">
            Service is unavailable daily from
            <span className="font-bold mx-1">
              12:00 AM to 6:00 AM
            </span>

          </p>
        </AlertDescription>
      </Alert>
    </section>
  );
}
