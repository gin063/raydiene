// composables/useOss.ts

export const useVideoUrl = (filename: string) => {
  const config = useRuntimeConfig();
  // 自动拼接：域名 + 文件名
  return `${config.public.videoBaseURL}${filename}`;
};

export const usePdfUrl = (filename: string) => {
  const config = useRuntimeConfig();
  return `${config.public.pdfBaseURL}${filename}`;
};
