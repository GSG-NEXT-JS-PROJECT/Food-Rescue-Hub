import PostDonationForm from "./components/PostDonationForm";

export const metadata = {
  title: "Post Donation | Food Rescue Hub",
  description: "Share your surplus food and help reduce waste.",
  keywords: ["food rescue", "donation", "zero waste", "sustainability"],
};

export default function DonationPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <PostDonationForm />
    </div>
  );
}
