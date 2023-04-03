<script>
import { ref, watch } from 'vue'
import firebase from '../plugin/firebase'

export default {
    props: {
        show: Boolean,
        title: String,
        content: String,
        tags: Array,
        newTag: String,
        id: Number,
    },
    emits: ['close'],
    setup(props, { emit }) {
        const titleRef = ref(props.title || '')
        const contentRef = ref(props.content || '')
        const tagsRef = ref(props.tags || [])
        const newTagRef = ref('')
        const idRef = ref(props.id || '')

        function confirmNewCard() {
            if (hasValidValues()) {
                const count = countTags(tagsRef.value);
                if (idRef.value == '') {
                    console.log("create");
                    firebase.setCard(firebase.db, titleRef.value.trim(), contentRef.value.trim(), tagsRef.value).then(() => {
                        emit('close');
                        location.reload();
                    })

                }
                else {
                    firebase.updateCard(firebase.db, titleRef.value.trim(), contentRef.value.trim(), tagsRef.value, idRef.value).then(() => {
                        emit('close');
                        location.reload();
                    })
                }
            }
        }

        function hasValidValues() {
            return titleRef.value.trim() && contentRef.value.trim()
        }
        function countTags(tags) {
            let count = 0;
            for (let key in tags) {
                if (tags.hasOwnProperty(key)) {
                    count++;
                }
            }
            const result = count + 1;
            return result;
        }

        // Watch for props changes and update the refs accordingly
        watch(
            () => props,
            (newProps) => {
                titleRef.value = newProps.title || ''
                contentRef.value = newProps.content || ''
                tagsRef.value = newProps.tags || []
                newTagRef.value = ''
                idRef.value = newProps.id || null
            }
        )

        return {
            titleRef,
            contentRef,
            tagsRef,
            newTagRef,
            confirmNewCard,
        }
    },
}
</script>
  

<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <div class="modal-header">
                    <input id="titleinput" v-model="titleRef">
                    <div class="modal-body">
                        <textarea type="text" id="contentinput" v-model="contentRef" />
                        <select v-model="tagsRef" multiple>
                            <option value="Important">Important</option>
                            <option value="Warning">Warning</option>
                            <option value="Pour lundi">Pour lundi</option>
                            <option value="Idées sorties">Idées sorties</option>
                        </select>
                        <input id="taginput" v-model="newTagRef">
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            <button class="modal-default-button" @click="$emit('close')">Cancel</button>
                            <button class="modal-default-button" @click="confirmNewCard"
                                @keyup.enter="confirmNewCard">OK</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
li {
    list-style-type: none;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.738);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    background: linear-gradient(to bottom right, #fcfcfc, #04154778);
    border-radius: 10px;
    padding: 20px;
    margin: 5px;
    max-width: 35vw;
    min-height: 200px;
    width: 300px;
    margin: auto;
    padding: 20px 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: inherit;
    font-size: inherit;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0px;
}

.modal-body input {
    min-height: 60px;
}

.modal-container input,
.modal-container select,
.modal-container textarea {
    font-family: inherit;
    border: 0.7px solid grey;
    border-radius: 10px;
    font-family: inherit;
    font-size: 1rem;
    border-radius: 10px;
    min-width: 250px;
    width: 270px;
    margin-top: 4px;
}

.modal-body select {
    min-width: 255px;
    margin: 5px;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

#contentinput {
    height: 150px;
}

#taginput,
#titleinput {
    height: 50px;
}
</style>