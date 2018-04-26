/**
 * @description file upload for files on graph.cool server
 * @param projectId
 * @param fileId
 * @returns {Promise<any>}
 */
const uploadFile = async (projectId, file) => {
  const src = `https://files.graph.cool/${projectId}/${file.secret}`
  const fileAsBlob = await fetch(src)
    .then(r => r.blob())
  const endpoint = `https://api.graph.cool/file/v1/${process.env.GRAPHQL_PROJECT_ID}`
  const data = new FormData()
  data.append('data', fileAsBlob, file.name)
  const uploadedData = await fetch(endpoint, {
    method: 'POST',
    body: data
  }).then(r => r.json())
  return uploadedData
}

export {uploadFile}
