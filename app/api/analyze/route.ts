import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { headers, rows } = await req.json();

    if (!headers || !rows || !rows.length) {
      return NextResponse.json({ error: "분석할 데이터가 없습니다" }, { status: 400 });
    }

    // 분석용 데이터 준비 (최대 50행으로 제한)
    const sampleRows = rows.slice(0, 50);
    const csvText = [
      headers.join(","),
      ...sampleRows.map((row: string[]) => row.join(",")),
    ].join("\n");

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `아래 CSV 데이터를 분석하고, 반드시 아래 JSON 형식으로만 응답해주세요. JSON 외의 텍스트는 포함하지 마세요.

형식:
{
  "summary": "전체 데이터에 대한 요약 (한국어, 2-3문장)",
  "patterns": ["발견된 패턴 1", "발견된 패턴 2"],
  "outliers": ["이상값이나 특이사항 1"],
  "actions": ["추천 액션 아이템 1", "추천 액션 아이템 2"]
}

CSV 데이터:
${csvText}`,
        },
      ],
    });

    // 응답에서 JSON 추출
    const content = message.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "AI 응답 형식 오류" }, { status: 500 });
    }

    // JSON 블록 추출 (```json ... ``` 또는 순수 JSON)
    let jsonStr = content.text;
    const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }

    const insights = JSON.parse(jsonStr.trim());
    return NextResponse.json(insights);
  } catch (err) {
    console.error("분석 오류:", err);
    return NextResponse.json(
      { error: "AI 분석 중 오류가 발생했습니다. API 키를 확인해주세요." },
      { status: 500 }
    );
  }
}
