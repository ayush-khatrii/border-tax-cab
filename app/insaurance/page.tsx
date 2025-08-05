import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

const Insurance = () => {
  return (
    <section className="max-w-xl mx-auto text-center px-4 py-10">
      <h2 className="text-2xl font-semibold mb-4">
        Waadi Tax & Insurance Solutions
      </h2>
      <p className="mb-4 text-muted-foreground">
        Please send us the following details on WhatsApp:
      </p>
      <ul className="mb-6 text-left list-disc list-inside">
        <li>RC Photo</li>
        <li>Any Other Document (Optional)</li>
      </ul>

      <p className="mb-4 text-muted-foreground">
        हमें नीचे दी गई जानकारी व्हाट्सएप पर भेजें:
      </p>
      <ul className="mb-6 text-left list-disc list-inside">
        <li>आरसी फोटो</li>
        <li>कोई अन्य दस्तावेज़ (वैकल्पिक)</li>
      </ul>

      <Button asChild className="gap-2">
        <a
          href="https://wa.me/918200450219"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="text-lg" />
          Send to WhatsApp
        </a>
      </Button>
    </section>
  );
};

export default Insurance;
