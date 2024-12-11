import { NextRequest, NextResponse } from 'next/server';
import { fetchDataFromGAS } from '@/lib/gas';

export async function GET(request: NextRequest) {
  try {
    // クエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const params: Record<string, string> = {};

    // クエリパラメータをオブジェクト形式に変換
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    // GASからデータを取得
    const data = await fetchDataFromGAS(params);

    // データをJSON形式でレスポンス
    return NextResponse.json({ success: true, data: data.items });
  } catch (error) {
    console.error('Error fetching data from GAS:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
