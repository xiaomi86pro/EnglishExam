import { createClient } from "@/lib/supabase/client";

export function useRpc() {
  const supabase = createClient();

  async function callRpc<T>(
    fn: string,
    params?: Record<string, any>,
  ): Promise<T> {
    const { data, error } = await supabase.rpc(fn, params);

    if (error) {
      throw new Error(error.message);
    }

    return data as T;
  }

  return { callRpc };
}
