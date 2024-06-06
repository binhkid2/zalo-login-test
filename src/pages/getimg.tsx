
interface Model {
  id: string;
  name: string;
  family: string;
  pipelines: string[];
  base_resolution: {
    width?: number;
    height?: number;
  };
  price: number;
  author_url: string;
  license_url: string;
  created: string;
}

const modelsData: Model[] = [
    {
      "id": "lcm-dark-sushi-mix-v2-25",
      "name": "Dark Sushi Mix v2.25 LCM",
      "family": "latent-consistency",
      "pipelines": [
        "text-to-image",
        "image-to-image"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://civitai.com/user/Aitasai",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-12-22T13:28:08.394Z"
    },
    {
      "id": "lcm-realistic-vision-v5-1",
      "name": "Realistic Vision v5.1 LCM",
      "family": "latent-consistency",
      "pipelines": [
        "text-to-image",
        "image-to-image"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://civitai.com/user/SG_161222",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-12-22T13:28:07.466Z"
    },
    {
      "id": "lcm-dream-shaper-v8",
      "name": "DreamShaper v8 LCM",
      "family": "latent-consistency",
      "pipelines": [
        "text-to-image",
        "image-to-image"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://www.buymeacoffee.com/lyko",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-12-22T13:28:06.548Z"
    },
    {
      "id": "absolute-reality-v1-8-1",
      "name": "AbsoluteReality v1.8.1",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://www.buymeacoffee.com/lykon",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-09-23T23:29:15.111Z"
    },
    {
      "id": "dream-shaper-v8",
      "name": "DreamShaper v8",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://www.buymeacoffee.com/lykon",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-09-23T23:29:14.365Z"
    },
    {
      "id": "realistic-vision-v5-1",
      "name": "Realistic Vision v5.1",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://civitai.com/user/SG_161222",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-09-23T23:29:11.891Z"
    },
    {
      "id": "icbinp-seco",
      "name": "ICBINP SECO",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://civitai.com/user/residentchiefnz",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-09-23T23:29:08.305Z"
    },
    {
      "id": "realistic-vision-v5-1-inpainting",
      "name": "Realistic Vision v5.1 Inpainting",
      "family": "stable-diffusion",
      "pipelines": [
        "inpaint"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://civitai.com/user/SG_161222",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-09-23T23:29:05.824Z"
    },
    {
      "id": "stable-diffusion-xl-v1-0",
      "name": "Stable Diffusion XL",
      "family": "stable-diffusion-xl",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "inpaint"
      ],
      "base_resolution": {
        "width": 1024,
        "height": 1024
      },
      "price": 0.000075,
      "author_url": "https://stability.ai",
      "license_url": "https://getimg.ai/legal/stable-diffusion-xl-license",
      "created": "2023-08-01T10:59:42.161Z"
    },
    {
      "id": "dark-sushi-mix-v2-25",
      "name": "Dark Sushi Mix v2.25",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://civitai.com/user/Aitasai",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-07-18T12:24:02.283Z"
    },
    {
      "id": "absolute-reality-v1-6",
      "name": "AbsoluteReality v1.6",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://www.buymeacoffee.com/lykon",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-07-18T12:24:01.531Z"
    },
    {
      "id": "synthwave-punk-v2",
      "name": "SynthwavePunk v2",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://github.com/JustMaier",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-07-08T16:45:49.795Z"
    },
    {
      "id": "arcane-diffusion",
      "name": "Arcane Diffusion",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://twitter.com/Nitrosocke",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-07-08T16:45:49.049Z"
    },
    {
      "id": "moonfilm-reality-v3",
      "name": "MoonFilm Reality v3",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://ko-fi.com/leopasama",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-07-08T16:45:48.315Z"
    },
    {
      "id": "moonfilm-utopia-v3",
      "name": "MoonFilm Utopia v3",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://ko-fi.com/leopasama",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-07-08T16:45:47.573Z"
    },
    {
      "id": "moonfilm-film-grain-v1",
      "name": "MoonFilm FilmGrain v1",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://ko-fi.com/leopasama",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-07-08T16:45:46.819Z"
    },
    {
      "id": "openjourney-v4",
      "name": "Openjourney v4",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://prompthero.com/",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-07-07T10:25:10.675Z"
    },
    {
      "id": "realistic-vision-v3",
      "name": "Realistic Vision v3",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://civitai.com/user/SG_161222",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-07-07T10:25:09.919Z"
    },
    {
      "id": "icbinp-final",
      "name": "ICBINP Final",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://civitai.com/user/residentchiefnz",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-07-07T10:25:09.161Z"
    },
    {
      "id": "icbinp-relapse",
      "name": "ICBINP Relapse",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://civitai.com/user/residentchiefnz",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-07-07T10:25:08.391Z"
    },
    {
      "id": "icbinp-afterburn",
      "name": "ICBINP Afterburn",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://civitai.com/user/residentchiefnz",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-07-07T10:25:07.631Z"
    },
    {
      "id": "xsarchitectural-interior-design",
      "name": "InteriorDesign",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://civitai.com/user/Xsarchitectural",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-06-20T07:53:26.666Z"
    },
    {
      "id": "mo-di-diffusion",
      "name": "Modern Disney Diffusion",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://twitter.com/Nitrosocke",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-06-20T07:53:25.914Z"
    },
    {
      "id": "anashel-rpg",
      "name": "RPG",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://huggingface.co/Anashel",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-06-20T07:53:25.121Z"
    },
    {
      "id": "realistic-vision-v1-3-inpainting",
      "name": "Realistic Vision v1.3 Inpainting",
      "family": "stable-diffusion",
      "pipelines": [
        "inpaint"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://civitai.com/user/SG_161222",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-06-01T23:24:45.903Z"
    },
    {
      "id": "eimis-anime-diffusion-v1-0",
      "name": "Anime Diffusion",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://huggingface.co/eimiss",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-05-23T18:51:22.297Z"
    },
    {
      "id": "something-v2-2",
      "name": "Something V2.2",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://twitter.com/nocrypt_",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-05-23T18:47:49.900Z"
    },
    {
      "id": "icbinp",
      "name": "ICBINP",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://civitai.com/user/residentchiefnz",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-05-23T18:47:49.155Z"
    },
    {
      "id": "analog-diffusion",
      "name": "Analog Diffusion",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://twitter.com/wavymulder",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-05-23T17:52:50.436Z"
    },
    {
      "id": "neverending-dream",
      "name": "NeverEnding Dream",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://www.buymeacoffee.com/lykon",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-05-23T17:52:49.694Z"
    },
    {
      "id": "van-gogh-diffusion",
      "name": "Van Gogh Diffusion",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://huggingface.co/dallinmackay",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-05-23T17:52:48.948Z"
    },
    {
      "id": "openjourney-v1-0",
      "name": "Openjourney",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://prompthero.com/",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-05-23T17:52:48.186Z"
    },
    {
      "id": "realistic-vision-v1-3",
      "name": "Realistic Vision v1.3",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://civitai.com/user/SG_161222",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-05-23T17:49:18.268Z"
    },
    {
      "id": "stable-diffusion-v1-5-inpainting",
      "name": "Stable Diffusion Inpainting v1.5",
      "family": "stable-diffusion",
      "pipelines": [
        "inpaint"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://runwayml.com/",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-05-19T21:30:32.339Z"
    },
    {
      "id": "gfpgan-v1-3",
      "name": "GFPGAN v1.3",
      "family": "enhancements",
      "pipelines": [
        "face-fix"
      ],
      "base_resolution": {},
      "price": 0.02,
      "author_url": "https://arc.tencent.com/zh/index",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-05-19T08:09:17.223Z"
    },
    {
      "id": "real-esrgan-4x",
      "name": "Real-ESRGAN",
      "family": "enhancements",
      "pipelines": [
        "upscale"
      ],
      "base_resolution": {},
      "price": 0.0055,
      "author_url": "https://xinntao.github.io/",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-05-19T08:09:16.471Z"
    },
    {
      "id": "instruct-pix2pix",
      "name": "Instruct Pix2Pix",
      "family": "stable-diffusion",
      "pipelines": [
        "instruct"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://www.timothybrooks.com/about/",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-05-19T07:58:23.100Z"
    },
    {
      "id": "stable-diffusion-v2-1",
      "name": "Stable Diffusion v2.1",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image"
      ],
      "base_resolution": {
        "width": 768,
        "height": 768
      },
      "price": 0.000075,
      "author_url": "https://stability.ai/",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-05-19T07:58:21.603Z"
    },
    {
      "id": "stable-diffusion-v1-5",
      "name": "Stable Diffusion v1.5",
      "family": "stable-diffusion",
      "pipelines": [
        "text-to-image",
        "image-to-image",
        "controlnet"
      ],
      "base_resolution": {
        "width": 512,
        "height": 512
      },
      "price": 0.000075,
      "author_url": "https://runwayml.com/",
      "license_url": "https://huggingface.co/spaces/CompVis/stable-diffusion-license",
      "created": "2023-05-19T07:58:20.848Z"
    }
  ]

export default function GetImgPage () {
  return (
    <div className="App">
      <h1>Models</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Family</th>
            <th>Pipelines</th>
            <th>Base Resolution</th>
            <th>Price</th>
            <th>Author URL</th>
            <th>License URL</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {modelsData.map((model) => (
            <tr key={model.id}>
              <td>{model.id}</td>
              <td>{model.name}</td>
              <td>{model.family}</td>
              <td>{model.pipelines.join(', ')}</td>
              <td>
                {`${model.base_resolution.width}x${model.base_resolution.height}`}
              </td>
              <td>${model.price.toFixed(6)}</td>
              <td><a href={model.author_url}>{model.author_url}</a></td>
              <td><a href={model.license_url}>{model.license_url}</a></td>
              <td>{new Date(model.created).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

