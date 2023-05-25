import { test, expect } from "@jest/globals";
import * as url from "node:url";
import * as path from "node:path";
import { AudioTagsLoader } from "../fs/audio_tags.js";

test("Test audio tags loader from file", async () => {
  const filePath = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    "./example_data/test.mp3"
  );
  const loader = new AudioTagsLoader(filePath);
  const docs = await loader.load();

  expect(docs.length).toBe(1);
  console.log(docs[0].metadata, docs[0].pageContent)
  expect(docs[0].pageContent).toContain("say nothing");
  expect(docs[0].metadata.title).toBe("Say Nothing (feat. MAY-A)");
});
