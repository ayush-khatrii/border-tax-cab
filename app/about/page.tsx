"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const About = () => {

  return (
    <section className="mt-20 flex items-center justify-center px-4 py-12 bg-background">
      <div className=" w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Taxi/vehicle image */}
        <div className="w-full lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1518614768202-663a3a0ecf59?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Taxi illustration"
            width={500}
            height={400}
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>

        {/* Text content */}
        <div className="w-full lg:w-1/2 space-y-5 text-center lg:text-left">
          <h1 className="text-3xl font-bold">About EasyTax</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            EasyTax helps you pay your vehicle border entry tax online—quickly, securely, and without the hassle of queues or paperwork. Whether you're entering a different state or just crossing a border, we've got you covered.
          </p>

          {/* Contact Info */}
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>Address:</strong> 123 Transport Nagar, New Delhi, India</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Email:</strong> support@easytax.in</p>
          </div>

          {/* CTA Button */}
          <Button className="mt-4 w-full sm:w-auto" onClick={() => {
            // 
          }}>
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;
