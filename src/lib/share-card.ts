interface ShareCardOptions {
  averageError: number;
  illusionLevel: "low" | "medium" | "high";
  topSurprises: Array<{
    title: string;
    difference: number;
  }>;
  locale: "ko" | "en";
}

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;

const TEXTS = {
  ko: {
    title: "집단 착각 부수기",
    subtitle: "나의 착각 지수",
    topSurprises: "가장 놀라운 결과",
    cta: "나도 테스트하기 →",
  },
  en: {
    title: "Break Collective Illusions",
    subtitle: "My Illusion Index",
    topSurprises: "Top Surprises",
    cta: "Take the test →",
  },
};

function getGradient(
  ctx: CanvasRenderingContext2D,
  level: "low" | "medium" | "high",
) {
  const gradient = ctx.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT);
  switch (level) {
    case "low":
      gradient.addColorStop(0, "#059669");
      gradient.addColorStop(1, "#10b981");
      break;
    case "medium":
      gradient.addColorStop(0, "#d97706");
      gradient.addColorStop(1, "#f59e0b");
      break;
    case "high":
      gradient.addColorStop(0, "#dc2626");
      gradient.addColorStop(1, "#ef4444");
      break;
  }
  return gradient;
}

export async function generateShareCard(
  options: ShareCardOptions,
): Promise<Blob> {
  const { averageError, illusionLevel, topSurprises, locale } = options;
  const texts = TEXTS[locale];

  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  ctx.fillStyle = getGradient(ctx, illusionLevel);
  ctx.globalAlpha = 0.15;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 36px system-ui, -apple-system, sans-serif";
  ctx.fillText(texts.title, 60, 70);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "24px system-ui, -apple-system, sans-serif";
  ctx.fillText(texts.subtitle, 60, 180);

  const gradient = getGradient(ctx, illusionLevel);
  ctx.fillStyle = gradient;
  ctx.font = "bold 120px system-ui, -apple-system, sans-serif";
  ctx.fillText(`${averageError}%p`, 60, 300);

  if (topSurprises.length > 0) {
    ctx.fillStyle = "#94a3b8";
    ctx.font = "20px system-ui, -apple-system, sans-serif";
    ctx.fillText(texts.topSurprises, 60, 400);

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "18px system-ui, -apple-system, sans-serif";
    topSurprises.slice(0, 2).forEach((item, idx) => {
      const emoji = idx === 0 ? "🥇" : "🥈";
      const diffSign = item.difference > 0 ? "+" : "";
      const text = `${emoji} ${item.title.slice(0, 40)}${item.title.length > 40 ? "..." : ""} (${diffSign}${item.difference}%p)`;
      ctx.fillText(text, 60, 440 + idx * 35);
    });
  }

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
  ctx.fillText(texts.cta, 60, 580);

  ctx.fillStyle = "#64748b";
  ctx.font = "16px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("break-collective-illusions.vercel.app", CARD_WIDTH - 60, 580);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create blob"));
        }
      },
      "image/png",
      1,
    );
  });
}

export async function downloadShareCard(options: ShareCardOptions) {
  const blob = await generateShareCard(options);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "my-illusion-index.png";
  a.click();
  URL.revokeObjectURL(url);
}

export async function shareCardNative(options: ShareCardOptions) {
  const blob = await generateShareCard(options);
  const file = new File([blob], "my-illusion-index.png", { type: "image/png" });

  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: TEXTS[options.locale].title,
    });
    return true;
  }
  return false;
}
