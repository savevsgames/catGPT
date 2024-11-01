import { TheCatAPI } from "@thatapicompany/thecatapi";
import { Image } from "@thatapicompany/thecatapi/dist/types";

if (!import.meta.env.VITE_CAT_API_KEY) {
  throw new Error(
    "Missing CAT_API_KEY environment var. Check your .env file!!!!"
  );
}

const catApi = new TheCatAPI(import.meta.env.VITE_CAT_API_KEY || "");

/**
 *
 * @param quantity This property describes how many images are to be returned
 * @param size This property describes the size of the image
 * @returns This function returns an array of "Image" objects that hold the following properties:
 *
 * id: string - The ID of the image
 *
 * width: number - The width of the image
 *
 * height: number - The Height of the image
 *
 * url: string - The location of the image.
 *
 * **USE THIS IN THE `img` HTML TAG!**
 *
 * breeds - The breeds found in the image _(Nullable!)_
 *
 * categories - The categories the image is in _(Nullable!)_
 */
async function fetchCatPictures(
  quantity: number = 1,
  size: "small" | "med" | "full" = "full"
): Promise<Image[]> {
  return await catApi.images.searchImages({
    limit: quantity,
    mimeTypes: ["png"],
    size: size,
  });
}

export default fetchCatPictures;
