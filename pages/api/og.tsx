import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const Pretendard = () =>
  fetch(
    new URL(
      `https://raw.githubusercontent.com/anaclumos/font-cdn/main/Pretendard-SemiBold.woff`,
    ),
  ).then((res) => res.arrayBuffer());

const NotoSansSc = () =>
  fetch(
    new URL(
      `https://raw.githubusercontent.com/anaclumos/font-cdn/main/NotoSansSC-Bold.otf`,
    ),
  ).then((res) => res.arrayBuffer());

const NotoSansTc = () =>
  fetch(
    new URL(
      `https://raw.githubusercontent.com/anaclumos/font-cdn/main/NotoSansTC-Bold.otf`,
    ),
  ).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const [pretendardData, NotoSansScData, NotoSansTcData] = await Promise.all([
      Pretendard(),
      NotoSansSc(),
      NotoSansTc(),
    ]);
    const { searchParams } = new URL(req.url);
    const hasTitle = searchParams.get("title")?.slice(0, 150);
    const title = hasTitle
      ? searchParams.get("title")
      : "Generate Images on the Fly :)";

    const hasSubheading = searchParams.get("subheading")?.slice(0, 150);
    const subheading = hasSubheading
      ? searchParams.get("subheading")
      : "Hello, World!";

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            padding: "60px 160px",
            justifyContent: "center",
            fontSize: 140,
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
              margin: "20px 0",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 80,
              color: "gray",
            }}
          >
            {subheading}
          </div>
        </div>
      ),
      {
        width: 2400,
        height: 1260,
        emoji: "fluent",
        fonts: [
          {
            name: "Pretendard",
            data: pretendardData,
            style: "normal",
            weight: 700,
          },
          {
            name: "NotoSansSc",
            data: NotoSansScData,
            style: "normal",
            weight: 700,
          },
          {
            name: "NotoSansTc",
            data: NotoSansTcData,
            style: "normal",
            weight: 700,
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
