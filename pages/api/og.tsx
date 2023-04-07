import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

const font = fetch(new URL('../../assets/Pretendard-SemiBold.woff2', import.meta.url)).then(
  (res) => res.arrayBuffer()
)

export default async function handler(req: NextRequest) {
  const fontData = await font
  try {
    const { searchParams } = new URL(req.url)
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 150)
      : 'The Latest Tech News 🗞️ in Your Language 💬 in Your Inbox 📭'

    const hasSubheading = searchParams.get('subheading')?.slice(0, 150)
    const subheading = hasSubheading ? searchParams.get('subheading') : 'hn.cho.sh'

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            padding: '20px 150px',
            justifyContent: 'center',
            fontFamily: 'Pretendard, Inter, "Fluent Emoji"',
            fontSize: 60,
            backgroundColor: '#c5daec',
            backgroundImage: 'linear-gradient(9, #c5daec 0%, #ffffff 80%)',
            letterSpacing: -3,
            lineHeight: 1.2,
            fontWeight: 900,
            wordWrap: 'break-word',
            wordBreak: 'keep-all',
          }}
        >
          <div
            style={{
              fontSize: 40,
              color: 'gray',
              margin: '20px 0',
            }}
          >
            {subheading}
          </div>
          <div>{title}</div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Pretendard',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
