export default {
  methods: {
    /**
     * @description file upload for files on graph.cool server
     * @param projectId
     * @param fileId
     * @returns {Promise<any>}
     */
    async uploadFile (projectId, file) {
      const src = `https://files.graph.cool/${projectId}/${file.secret}`
      const fileAsBlob = await fetch(src)
        .then(r => r.blob())
      const endpoint = `${process.env.ENDPOINT}`
      const data = new FormData()
      data.append('data', fileAsBlob, file.name)
      const uploadedData = await fetch(endpoint, {
        method: 'POST',
        body: data
      }).then(r => r.json())
      return uploadedData
    }
  }
}
