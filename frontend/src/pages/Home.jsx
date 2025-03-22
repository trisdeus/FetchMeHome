import Footer from "./components/footer";
import Logo from "./components/logo";
import Button from "./components/button";
import FAQItem from "./components/FAQItem";
import servicesImage from "./assets/images/services-stock-image.jpg";

export default function Home() {
  return (
    <>
      <main>
        <div className="hero">
          <Logo size="full" />
          <span className="buttons">
            <Button text="Adopt Now" primary="primary" color="beige" />
            <Button text="Find Lost Pets" primary="secondary" color="white" />
          </span>
        </div>
        <div id="services">
          <div className="content">
            <h2>Our Services</h2>
            <p>
              We provide a wide range of services to help you find your lost
              pets and adopt new pets. Our platform allows you to create and
              manage listings for lost and found pets, making it easier to
              reunite with your furry friends.
            </p>
            <Button text="Create a Listing" primary="primary" color="beige" />
          </div>
          <div className="image">
            <img src={servicesImage} alt="pets" />
          </div>
        </div>
        <div id="faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-items">
            <FAQItem
              question="How do I create a listing?"
              answer="To create a listing, simply click the 'Create a Listing' button and follow the prompts to enter your pet's details."
            />
            <FAQItem
              question="How do I adopt a pet?"
              answer="Adopting a pet is easy! Browse our listings, select a pet, and follow the instructions on the pet's profile to contact the owner."
            />
            <FAQItem
              question="How do I search for lost pets?"
              answer="Use the search functionality on our platform to filter and find lost pet listings by location, type, or other criteria."
            />
            <FAQItem
              question="How do I contact the owner?"
              answer="Each listing provides contact details or a contact form. Click on the listing and follow the instructions to get in touch with the owner."
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
