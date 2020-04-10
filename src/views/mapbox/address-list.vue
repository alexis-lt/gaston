<template>
    <div class="card">
        <form>
            <div class="form-example">
                <label for="title">Rechercher une adresse : </label>
                <input type="text" name="address" id="address" required v-model="address">
                <ul>
                    <li v-for="exemple in exemples" :key="exemple.id">
                        <input type="radio" :id="exemple.id" name="exemple" :value="exemple" v-model="selectedAddress" @change="selectAddress">
                        <label :for="exemple.id">{{ exemple.label }}</label>
                    </li>
                </ul>
            </div>
        </form>
        <p v-if="selectedAddress">Addresse sélectionnée : {{ selectedAddress.label }}</p>
    </div>
</template>

<script>
import axios from 'axios'
import debounce from 'lodash/debounce'

export default {
    props: {
        value: { type: Object, required: true },
    },

    data () {
        return {
            address: "",
            response: {},
            exemples: [],
            selectedAddress: null
        }
    },

    methods: {

        directSearch: debounce( function () { this.addressSearch() }, 250),
        
        async addressSearch() {
            if (this.address.length !== 0 || this.address.trim()) {
                try {
                    let toSearch = 'https://api-adresse.data.gouv.fr/search/?q=' + this.address + '&limit=5'
                    await axios
                        .get(toSearch)
                        .then(response => (this.response = response))
                    this.loadExemples()
                } catch (error) {
                    console.log(error)
                }
            } else {
                this.exemples = []
            }
        },

        loadExemples() {
            this.exemples = this.response.data.features.map(item => {
                return {
                    id: item.properties.id,
                    label: item.properties.label,
                    coordinates: item.geometry.coordinates
                }
            })
        },

        selectAddress() {
            this.$emit('input', this.selectedAddress)
            this.address = ''
            this.exemples = []
        }
    },
  
    watch: {
        'address': function () {
            this.directSearch()
        },
    },
}
</script>

<style lang="scss">
    #address {
        width: 400px;
    }
</style>