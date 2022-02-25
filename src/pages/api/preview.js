import nc from "next-connect";
import fetch from "node-fetch";

const handler = nc()

handler.get(async(req,res)=>{
   if (!req.query.slug) {
    return res.status(404).end();
  }
  const content = await fetch(
    `https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/blog/${req.query.slug}?draftKey=${req.query.draftKey}`,
    { headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY || '' } }
  )
    .then((res) => res.json())
    .catch((error) => null);
  if (!content) {
    return res.status(401).json({message:'Invalid slug'})
  }

  res.setPreviewData({
    slug:content.id,
    draftKey:req.query.draftKey
  })
  res.writeHead(307,{Location:`/${content.id}`})
  res.end("Preview mode enabled")
})
export default handler


