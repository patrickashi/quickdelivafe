import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import api from "../utils/api";
import Input from "../components/Input";
import Button from "../components/Button";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const [hover, setHover] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await api.get("/orders/reviews/");
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews", err);
    }
  };
  useEffect(() => { fetchReviews(); }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.rating <= 0) return alert("Please select a star rating 🌟");
    setLoading(true);
    try {
      await api.post("/orders/reviews/", form); // no token required
      setForm({ name: "", rating: 0, comment: "" });
      fetchReviews();
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    } finally {
      setLoading(false);
      setHover(null);
    }
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-3xl font-bold text-center text-quickdeliva mb-10 font-[Sora]">
        What Our Customers Say
      </h2>

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-14 max-w-6xl mx-auto">
        {reviews.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No reviews yet — be the first to share your experience ✨
          </p>
        ) : (
          reviews.slice(0, 6).map((r) => (
            <div
              key={r.id}
              className="relative bg-white/30 dark:bg-gray-700/30 backdrop-blur-md 
                         border border-white/30 dark:border-gray-600/30 rounded-xl 
                         shadow-md p-6 transition hover:shadow-lg"
            >
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < r.rating ? "#fbbf24" : "#d1d5db"}
                    className="w-5 h-5"
                  />
                ))}
              </div>
              <p className="italic text-gray-700 dark:text-gray-300 mb-3">
                “{r.comment}”
              </p>
              <p className="font-semibold text-quickdeliva">{r.name}</p>
              <p className="text-xs text-gray-500">
                {new Date(r.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Submit Review Form */}
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
        <h3 className="text-xl font-bold text-quickdeliva mb-4 text-center">
          Leave a Review
        </h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          {/* Star selector */}
          <div className="text-center">
            <label className="block mb-2 text-gray-700 dark:text-gray-200 font-medium">
              Rating
            </label>
            <div className="flex justify-center">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setForm({ ...form, rating: ratingValue })}
                      className="hidden"
                    />
                    <FaStar
                      className="cursor-pointer transition-transform hover:scale-110"
                      color={
                        ratingValue <= (hover || form.rating)
                          ? "#facc15"
                          : "#d1d5db"
                      }
                      size={28}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
            {form.rating > 0 && (
              <p className="mt-1 text-sm text-gray-500">
                You rated {form.rating} star{form.rating > 1 && "s"} ⭐
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
              Comment
            </label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Share your Quickdeliva experience..."
              rows="4"
              required
              className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 
                         text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 
                         focus:ring-2 focus:ring-quickdeliva outline-none transition"
            ></textarea>
          </div>

          <Button className="w-full" disabled={loading}>
            {loading ? "Submitting…" : "Submit Review"}
          </Button>
        </form>
      </div>
    </section>
  );
}