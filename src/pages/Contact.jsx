import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Contact() {
  return (
    <div>
      <Navbar />
      <div className="p-6 lg:p-12 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-quickdeliva mb-4">Contact Us</h1>
        <form>
          <Input label="Name" placeholder="Your name" />
          <Input label="Email" type="email" placeholder="Your email" />
          <Input label="Message" type="text" placeholder="Your message" />
          <Button className="w-full mt-4">Send</Button>
        </form>
      </div>
    </div>
  );
}