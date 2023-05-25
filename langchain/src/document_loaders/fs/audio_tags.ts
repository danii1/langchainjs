import { Document } from "../../document.js";
import { BufferLoader } from "./buffer.js";

export class AudioTagsLoader extends BufferLoader {
  constructor(filePathOrBlob: string | Blob) {
    super(filePathOrBlob);
  }

  protected async parse(raw: Buffer): Promise<Document[]> {
    const { jsmediatags } = await JSMediaTagsLoaderImports();

    return new Promise((resolve, reject) => {
      new jsmediatags.Reader(raw)
        .read({
          onSuccess: (tag) => {
            const { lyrics, picture, APIC, ...rest } = tag.tags
            console.log(tag.tags)
            const document = new Document({
              pageContent: (lyrics as any)?.lyrics || lyrics || "",
              metadata: rest
            })
            resolve([document]);
          },
          onError: (error) => {
            reject(error);
          }
        });
    })
  }
}

async function JSMediaTagsLoaderImports() {
  try {
    const jsmediatags = await import("jsmediatags");
    return { jsmediatags };
  } catch (e) {
    console.error(e);
    throw new Error(
      "Please install jsmediatags as a dependency with, e.g. `yarn add jsmediatags`"
    );
  }
}