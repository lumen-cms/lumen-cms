import mutateCreateMedia from '~createMedia'
import deleteMediaGql from '../gql/media/deleteMedia.gql'
import addToMediaOnFile1 from '../gql/media/addFileToFilesMedia.gql'
import removeFromMediaOnFile1 from '../gql/media/removeFromMediaOnFile1.gql'
import updateFileReferenceGql from '../gql/fileReference/updateFileReference.gql'
import createFileReferenceGql from '../gql/fileReference/createFileReference.gql'
import deleteFileReferenceGql from '../gql/fileReference/deleteFileReference.gql'

const updateQueries = {
  addToMediaOnFile1
}

export default {
  methods: {
    refetchQueries (queryName) {
      if (!queryName) return
      if (queryName.constructor === Array) {
        for (const name of queryName) {
          this.refetchGql(name)
        }
      } else {
        this.refetchGql(queryName)
      }
    },

    /**
     *
     * @param {string} mediaId
     * @param {array|string} [refetchQueries]
     * @returns {*|Promise.<*>}
     */
    async deleteMediaOnId (mediaId, refetchQueries) {
      const mutationOptions = {
        mutation: deleteMediaGql,
        variables: {
          id: mediaId
        }
      }
      await this.mutateGql(mutationOptions, 'deleteMedia')
      this.refetchQueries(refetchQueries)
    },

    /**
     *
     * @param {object} variables
     * @param {array|string} [refetchQueries]
     */
    async createMedia (variables, refetchQueries) {
      const obj = {
        mutation: mutateCreateMedia,
        variables
      }

      await this.mutateGql(obj, 'createMedia')
      this.refetchQueries(refetchQueries)
    },

    /**
     *
     * @param {array} media
     * @param {array|object} files
     * @param {string} type
     * @param {object} createObject
     * @param {string|object} refetchQueries
     * @returns {Promise.<void>}
     */
    async updateFilesOnMedia (media = [], files, type, createObject, refetchQueries) {
      const gallery = media.find(e => e.files && e.files.length)
      if (files.constructor !== Array) {
        files = [files]
      }
      if (gallery && gallery.id) {
        // if media exists then run update reference mutation
        let i = 1
        const fileLength = files.length
        for (const f of files) {
          if (!f.id) {
            console.warn('file does not have an ID in the object')
            return
          }
          const variables = {
            mediaFilesMediaId: gallery.id,
            filesFileId: f.id
          }
          await this.mutateGql({
            mutation: updateQueries[type],
            variables
          }, type)
          if (i === fileLength && refetchQueries) {
            await this.refetchQueries(refetchQueries)
          }
          i++
        }
      } else {
        // need to create media first based on createObject
        const filesIds = files && files.map(i => i.id)
        if (!filesIds) {
          console.warn('update files did not find a gallery')
          return
        }
        const variables = Object.assign({}, createObject, {
          filesIds: filesIds
        })
        await this.createMedia(variables, refetchQueries)
      }
    },

    /**
     *
     * @param variables
     * @param refetchQueries
     * @returns {Promise.<void>}
     */
    async updateFileReference (variables, refetchQueries) {
      const mutationOptions = {
        mutation: updateFileReferenceGql,
        variables
      }
      await this.mutateGql(mutationOptions, 'updateFileReference')
      this.refetchQueries(refetchQueries)
    },

    /**
     *
     * @param variables
     * @param refetchQueries
     * @returns {Promise.<*>}
     */
    async createFileReference (variables, refetchQueries) {
      const mutationOptions = {
        mutation: createFileReferenceGql,
        variables
      }
      const data = await this.mutateGql(mutationOptions, 'createFileReference')
      this.refetchQueries(refetchQueries)
      return data
    },

    /**
     *
     * @param id
     * @param refetchQueries
     * @returns {Promise.<void>}
     */
    async deleteFileReference (id, refetchQueries) {
      await this.mutateGql({
        mutation: deleteFileReferenceGql,
        variables: {
          id: id
        }
      })
      this.refetchQueries(refetchQueries)
    },
    /**
     *
     * @param mediaId
     * @param fileId
     * @param refetchQueries
     * @returns {Promise.<void>}
     */
    async removeFileOnMedia (mediaId, fileId, refetchQueries) {
      await this.mutateGql({
        mutation: removeFromMediaOnFile1,
        variables: {
          filesFileId: fileId,
          mediaFilesMediaId: mediaId
        }
      })
      this.refetchQueries(refetchQueries)
    },
    /**
     *
     * @param {object} media
     * @param {string} fileId
     * @param {string} mediaProperty
     * @param {string|array} [refetchQueries]
     * @returns {Promise.<void>}
     */
    async mediaImageDelete (media = [], fileId, mediaProperty, refetchQueries) {
      this.$store.commit('SET_MEDIA_DELETING', true)
      if (mediaProperty === 'previewImage' || mediaProperty === 'headerImage') {
        const data = media.filter(e => e[mediaProperty] && e[mediaProperty].id === fileId)
        if (!data.length) {
          console.warn('no image/media found')
          return
        }
        for (const m of data) {
          await this.deleteMediaOnId(m.id, refetchQueries)
          // await this.deleteFileOnId(fileId, refetchQueries)
        }
      } else if (mediaProperty === 'files') {
        let gallery = media.filter(e => e[mediaProperty] && e[mediaProperty].length)
        gallery = gallery[0]
        const images = gallery && gallery[mediaProperty]
        const item = images.find(e => e.id === fileId)
        if (!item) {
          console.warn('no image/media found')
          return
        }
        await this.removeFileOnMedia(gallery.id, fileId, refetchQueries)
        // await this.deleteFileOnId(fileId, refetchQueries)
      }
      this.$store.commit('SET_MEDIA_DELETING', false)
    }
  }
}
