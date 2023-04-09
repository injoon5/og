import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const fontSans = () =>
  fetch(new URL(`https://og.cho.sh/Pretendard-ExtraBold.woff`)).then((res) =>
    res.arrayBuffer()
  )

export default async function handler(req: NextRequest) {
  const fontSansData = await fontSans()
  try {
    const { searchParams } = new URL(req.url);
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 150)
      : "The Latest Tech News 🗞️ in Your Language 💬 in Your Inbox 📭";

    const hasSubheading = searchParams.get("subheading")?.slice(0, 150);
    const subheading = hasSubheading
      ? searchParams.get("subheading")
      : "hn.cho.sh";

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            padding: "20px 150px",
            justifyContent: "center",
            fontFamily: 'Pretendard, Inter, "Fluent Emoji"',
            fontSize: 150,
            backgroundImage: "linear-gradient(9, #151b36 0%, #000000 80%)",
            letterSpacing: -3,
            lineHeight: 1.2,
            fontWeight: 700,
            color: "white",
            wordWrap: "break-word",
            wordBreak: "keep-all",
          }}
        >
          <div
            style={{
              fontSize: 100,
              color: "gray",
              margin: "20px 0",
            }}
          >
            {subheading}
          </div>
          <div>{title}</div>
        </div>
      ),
      {
        width: 2400,
        height: 1260,
        fonts: [
          {
            name: 'Pretendard',
            data: fontSansData,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
