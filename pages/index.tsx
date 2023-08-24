import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [subheading, setSubheading] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "/api/og/?title=Generate%20Images%20on%20the%20Fly!&subheading=Hello%2C%20World!",
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setImageUrl(
      `/api/og/?title=${encodeURIComponent(
        title,
      )}&subheading=${encodeURIComponent(subheading)}`,
    );
    console.log(imageUrl);
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        display: "grid",
        placeItems: "center",
        fontFamily:
          "'SF Pro', ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo','Pretendard', 'Apple Color Emoji', 'Segoe UI Emoji', system-ui, -system-ui, sans-serif",
      }}
    >
      <h1>OG Image Generator</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <label>
          <input
            type="text"
            value={subheading}
            placeholder="Subheading"
            style={{
              fontSize: 20,
              width: "100%",
              margin: "1rem auto",
              padding: 8,
              borderRadius: 8,
            }}
            onChange={(e) => setSubheading(e.target.value)}
          />
        </label>

        <label>
          <input
            type="text"
            value={title}
            placeholder="Title"
            style={{
              fontSize: 40,
              width: "100%",
              margin: "1rem auto",
              padding: 8,
              borderRadius: 8,
            }}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <button
          type="submit"
          style={{
            fontFamily:
              "'SF Pro', ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo','Pretendard', 'Apple Color Emoji', 'Segoe UI Emoji', system-ui, -system-ui, sans-serif",
            width: "30%",
            padding: 8,
            borderRadius: 8,
            margin: "1rem auto",
          }}
        >
          Generate Image
        </button>
      </form>
      {imageUrl && (
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            display: "grid",
            placeItems: "center",
          }}
        >
          <img
            src={imageUrl}
            style={{ width: "100%", height: "auto", margin: "20px 0" }}
            alt="Generated image"
          />
        </div>
      )}
    </div>
  );
}
