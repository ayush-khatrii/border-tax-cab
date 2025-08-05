import { Button } from "@/components/ui/button";
import { GiCheckMark } from "react-icons/gi";

const SuccessPage = () => {

  return (
    <section className="flex flex-col items-center text-center justify-center my-40 px-4">
      <div className="p-6 text-center">
        <div className="mb-4 text-white inline-flex p-4 rounded-full bg-primary">
          <GiCheckMark size="2.5em" />
        </div>
        <h1 className="text-2xl font-semibold mb-2">Payment Successful</h1>
        <p className="text-muted-foreground mb-4">Thank you for your purchase. Your payment has been received.</p>
        <Button asChild>
          <a
            href="/">
            Go to Home
          </a>
        </Button>
      </div>
    </section>
  );
};

export default SuccessPage;
