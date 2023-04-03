<script setup>
import { ref } from 'vue'
import firebase from '../plugin/firebase'
import SingleCard from '../components/SingleCard.vue'
import Modal from '../components/Modal.vue';


// A "ref" is a reactive data source that stores a value.
// Technically, we don't need to wrap the string with ref()
// in order to display it, but we will see in the next
// example why it is needed if we ever intend to change
// the value.

// READ ALL
const cardsList = ref([]);
async function chargeAllCards() {
    cardsList.value = await firebase.getCards(firebase.db);
};
chargeAllCards();


//CREATE
//Data variable to show/hide the form
const showForm = ref(false);


// Function to toggle the form visibility
// function openCreateForm() {
//     console.log("methode opencreateform");
//     showForm.value = !showForm.value;
//     setNewCard();
// };


</script>
<template>
    <div class="createSection">
        <button class="createButton" @click="showForm = true">
            <a class="open" href="#"></a>
        </button>
    </div>
    <div v-if="cardsList" class="allCards">
        <div>
            <ol>
                <SingleCard v-for="card in cardsList" :card="card" :key="card.id">
                    <span class="invisible">card.id</span>
                </SingleCard>
            </ol>
        </div>
    </div>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showForm" @close="showForm = false">
            <template #header>
                <h3>Create a card</h3>
            </template>
        </modal>
    </Teleport>
</template>
<style scoped>
.allCards {
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
}

div>ol {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

/* Create button*/
.open {
    background-color: #6de510;
    position: absolute;
    right: 12px;
    top: 12px;
    width: 22px;
    height: 22px;
    opacity: 0.8;
    cursor: pointer;
}

.open:hover {
    opacity: 1;
}

.open:before,
.open:after {
    position: absolute;
    left: 10px;
    content: ' ';
    height: 12px;
    width: 2px;
    top: 5px;
    background-color: #333;
}

.open:after {
    transform: rotate(-90deg);
}

.createButton {
    position: absolute;
}
</style>
