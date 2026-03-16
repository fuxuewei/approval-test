import React from "react";
enum ETypes3D {
  obj = "obj",
  stl = "stl",
  fbx = "fbx",
  gltf = "gltf",
  glb = "gltf",
  c4d = "c4d",
  // 媒体服务目前不支持
  "3ds" = "3ds",
  ply = "ply",
}

const mainFileExtensionsSet = new Set(Object.keys(ETypes3D));

import Icon3DFilled from "@/assets/icons/3d-filled.svg";
import Icon3DOutlined from "@/assets/icons/3d-outlined.svg";
import IconAIOutlined from "@/assets/icons/ai-outlined.svg";
import IconAI from "@/assets/icons/ai.svg";
import IconDocumentOutlined from "@/assets/icons/document-outlined.svg";
import IconDocument from "@/assets/icons/document.svg";
import IconExcelOutlined from "@/assets/icons/excel-outlined.svg";
import IconExcel from "@/assets/icons/excel.svg";
import IconFigmaOutlined from "@/assets/icons/figma-outlined.svg";
import IconFigma from "@/assets/icons/figma.svg";
import IconFontOutlined from "@/assets/icons/font-outlined.svg";
import IconFont from "@/assets/icons/font.svg";
import IconImageOutlined from "@/assets/icons/image-outlined.svg";
import IconImage from "@/assets/icons/image.svg";
import IconJSDOutlined from "@/assets/icons/jsd-outlined.svg";
import IconJSD from "@/assets/icons/jsd.svg";
import IconModelCubeSvg from "@/assets/icons/modelCube.svg";
import IconMusicOutlined from "@/assets/icons/music-outlined.svg";
import IconMusic from "@/assets/icons/music.svg";
import IconOtherTypeOutlined from "@/assets/icons/other-type-outlined.svg";
import IconOtherType from "@/assets/icons/other-type.svg";
import IconPDFOutlined from "@/assets/icons/pdf-outlined.svg";
import IconPDF from "@/assets/icons/pdf.svg";
import IconPPTOutlined from "@/assets/icons/ppt-outlined.svg";
import IconPPT from "@/assets/icons/ppt.svg";
import IconPSDOutlined from "@/assets/icons/psd-outlined.svg";
import IconPSD from "@/assets/icons/psd.svg";
import IconSketchOutlined from "@/assets/icons/sketch-outlined.svg";
import IconSketch from "@/assets/icons/sketch.svg";
import IconTableOutlined from "@/assets/icons/table-outlined.svg";
import IconTable from "@/assets/icons/table.svg";
import IconType_Code2Svg from "@/assets/icons/type_Code2.svg";
import IconType_Code3Svg from "@/assets/icons/type_Code3.svg";
import IconUnknownFileOutlined from "@/assets/icons/unknown-outlined.svg";
import IconUnknownFile from "@/assets/icons/unknown.svg";
import IconVideoOutlined from "@/assets/icons/video-outlined.svg";
import IconVideo from "@/assets/icons/video.svg";
import IconWordOutlined from "@/assets/icons/word-outlined.svg";
import IconWord from "@/assets/icons/word.svg";
import IconXDOutlined from "@/assets/icons/xd-outlined.svg";
import IconXD from "@/assets/icons/xd.svg";
import IconZipOutlined from "@/assets/icons/zip-outlined.svg";
import IconZip from "@/assets/icons/zip.svg";

import { cn } from "@/lib/utils";

export enum EIconExtKeys {
  "music" = "music",
  "video" = "video",
  "image" = "image",
  "zip" = "zip",
  "document" = "document",
  "ppt" = "ppt",
  "excel" = "excel",
  "psd" = "psd",
  "pdf" = "pdf",
  "table" = "table",
  "ai" = "ai",
  "font" = "font",
  "unknown" = "unknown",
  "sketch" = "sketch",
  "xd" = "xd",
  "jsd" = "jsd",
  "triD" = "triD",
  "figma" = "figma",
  "word" = "word",
  "code" = "code",
  "model" = "model",
  "audio" = "audio",
}
const iconToExtMap: {
  [k in EIconExtKeys]: {
    extensions: string[];
    Icon: React.ComponentType;
    IconOutlined: React.ComponentType;
  };
} = {
  code: {
    extensions: [
      "tsx",
      "xml",
      "css",
      "json",
      "html",
      "java",
      "cpp",
      "c",
      "h",
      "cs",
      "php",
      "js",
      "sql",
      "rb",
      "swift",
      "go",
      "kt",
      "lua",
      "pl",
      "scala",
      "ts",
      "vb",
      "yaml",
    ],
    Icon: IconType_Code2Svg,
    IconOutlined: IconType_Code2Svg,
  },
  model: {
    extensions: ["ckpt", "safetensors", "pt", "pth"],
    Icon: IconModelCubeSvg,
    IconOutlined: IconModelCubeSvg,
  },
  video: {
    extensions: [
      "mp4",
      "mov",
      "mpg",
      "avi",
      "wmv",
      "flv",
      "webm",
      "mkv",
      "mpeg",
      "3gp",
      "3g2",
      "vob",
      "rm",
      "insv",
    ],
    Icon: IconVideo,
    IconOutlined: IconVideoOutlined,
  },
  audio: {
    extensions: ["mp3", "wav", "flac", "aac", "wma", "ogg", "aiff", "alac", "dsd", "mp2"],
    Icon: IconMusic,
    IconOutlined: IconMusicOutlined,
  },
  music: {
    extensions: ["mp3", "wav", "flac", "aac", "wma", "ogg", "aiff", "alac", "dsd", "mp2"],
    Icon: IconMusic,
    IconOutlined: IconMusicOutlined,
  },
  image: {
    extensions: [
      "url",
      "svg",
      "pic",
      "jpeg",
      "jpg",
      "png",
      "gif",
      "tiff",
      "tif",
      "webp",
      "raw",
      "ico",
      "heic",
      "heif",
      "bmp",
      "cr2",
      "nef",
      "arw",
      "rw2",
      "pef",
      "orf",
      "x3f",
      "dng",
      "exr",
      "jxr",
      "apng",
      "flif",
      "j2k",
      "jp2",
      "pbm",
      "pgm",
      "ppm",
      "pam",
      "pnm",
      "tga",
      "dds",
      "bpg",
      "emf",
      "ithmb",
      "hdr",
      "cdr",
      "avif",
      "insp",
    ],
    Icon: IconImage,
    IconOutlined: IconImageOutlined,
  },
  zip: {
    extensions: [
      "zip",
      "gZ",
      "rar",
      "7z",
      "tar",
      "gzip",
      "bzip2",
      "xz",
      "lzh",
      "cab",
      "iso",
      "arj",
      "z",
      "eaglepack",
    ],
    Icon: IconZip,
    IconOutlined: IconZipOutlined,
  },
  document: {
    extensions: ["txt", "wps", "key", "pages", "markdown", "latex", "md", "tex", "epub"],
    Icon: IconDocument,
    IconOutlined: IconDocumentOutlined,
  },
  word: {
    extensions: ["doc", "docx"],
    Icon: IconWord,
    IconOutlined: IconWordOutlined,
  },
  ppt: {
    extensions: ["ppt", "pptx"],
    Icon: IconPPT,
    IconOutlined: IconPPTOutlined,
  },
  excel: {
    extensions: ["xls", "xlsx"],
    Icon: IconExcel,
    IconOutlined: IconExcelOutlined,
  },
  psd: {
    extensions: ["psd"],
    Icon: IconPSD,
    IconOutlined: IconPSDOutlined,
  },
  pdf: {
    extensions: ["pdf"],
    Icon: IconPDF,
    IconOutlined: IconPDFOutlined,
  },
  table: {
    extensions: ["csv", "numbers"],
    Icon: IconTable,
    IconOutlined: IconTableOutlined,
  },
  ai: {
    extensions: ["ai"],
    Icon: IconAI,
    IconOutlined: IconAIOutlined,
  },
  font: {
    extensions: ["ttf", "otf", "ttc", "ps", "woff", "woff2", "eot", "pcf", "xbm", "pfb", "pfa"],
    Icon: IconFont,
    IconOutlined: IconFontOutlined,
  },
  unknown: {
    extensions: ["", "unknown"],
    Icon: IconUnknownFile,
    IconOutlined: IconUnknownFileOutlined,
  },
  sketch: {
    extensions: ["sketch"],
    Icon: IconSketch,
    IconOutlined: IconSketchOutlined,
  },
  xd: {
    extensions: ["xd"],
    Icon: IconXD,
    IconOutlined: IconXDOutlined,
  },
  jsd: {
    extensions: ["jsd"],
    Icon: IconJSD,
    IconOutlined: IconJSDOutlined,
  },
  triD: {
    extensions: Array.from(mainFileExtensionsSet),
    Icon: Icon3DFilled,
    IconOutlined: Icon3DOutlined,
  },
  figma: {
    extensions: ["fig", "figma"],
    Icon: IconFigma,
    IconOutlined: IconFigmaOutlined,
  },
};
export const mapKeys = Object.keys(iconToExtMap);

const extToIcon = new Map<string, { filled: React.ComponentType; outlined: React.ComponentType }>();

for (const value of Object.values(iconToExtMap)) {
  value.extensions.forEach((ext) => {
    extToIcon.set(ext, {
      filled: value.Icon,
      outlined: value.IconOutlined,
    });
  });
}
for (const key of mapKeys) {
  extToIcon.set(key, {
    filled: iconToExtMap[key as EIconExtKeys].Icon,
    outlined: iconToExtMap[key as EIconExtKeys].IconOutlined,
  });
}

function getIconCompByExt(ext = "", type: "outlined" | "filled") {
  return (
    extToIcon.get(ext?.toLocaleLowerCase())?.[type] ||
    (type === "outlined" ? IconOtherTypeOutlined : IconOtherType)
  );
}

export function getIconByExt(ext = "", type: "outlined" | "filled", size: number) {
  const Icon = getIconCompByExt(ext, type);
  return <Icon style={{ width: size + "px" }} />;
}

export function AssetTypeIcon2(props: {
  ext: string;
  size: number;
  className?: string;
  type?: "outlined" | "filled";
}) {
  const { ext, size = 100, type = "filled" } = props;
  const codeExt = iconToExtMap.code.extensions;
  const isCode = codeExt.includes(ext?.toLocaleLowerCase());
  if (isCode) {
    return (
      <div
        className={cn("flex-center", props.className)}
        style={{
          width: size + "px",
        }}
      >
        <IconType_Code3Svg style={{ width: size + "px" }} />
      </div>
    );
  }

  return (
    <div
      className={cn("flex-center", props.className)}
      style={{
        width: size + "px",
      }}
    >
      {getIconByExt(ext, type, size)}
    </div>
  );
}
