/**
 * @description 日志导出类
 */
import { resolve, join } from 'path';

import { fastLogger } from "./logger";

let logOut = {
  console: process.env.NODE_ENV !== 'production', // 是否开启 日志打印
  level: 'info',
  serializers: {
    req: (req) => {
      return {
        method: req.method,
        url: req.url,
      };
    },
  },
  fileName: join(process.cwd(), 'logs/fast-gatgeway.log'), // 文件路径
  maxBufferLength: 4096, // 日志写入缓存队列最大长度
  flushInterval: 1000, // flush间隔
  logRotter: {
    byHour: true,
    byDay: false,
    hourDelimter: '_',
  },
};

export const FastifyLogger = fastLogger(logOut);
