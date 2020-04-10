
<template>
    <form method="post" enctype="multipart/form-data">
        <div>
            <label for="image_uploads">Sélectionner des images à uploader (PNG, JPG)</label>
            <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple @change="updateImageDisplay">
        </div>
        <div class="preview">
            <p v-if="!images.length">Aucun fichier sélectionné pour le moment</p>
            <img v-for="image in images" :key="image.index" :src="image.webkitRelativePath" :alt="image.name">
        </div>
        <div>
            <button>Envoyer</button>
        </div>
    </form>
</template>

<script>
    export default {
      data () {
        return {
            images: [],
        }
      },

        methods: {
                updateImageDisplay (event) {
                    console.log(event.target.files)
                    for (var i = 0; i < event.target.files.length; i++) {
                        this.images.push(event.target.files[i])
                    }
                    console.log(this.images)
                },

            }
    }
</script>