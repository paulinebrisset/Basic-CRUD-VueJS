<template>
    <div id="modal"></div>
    <div class="myCard">
        <div class="frame">
            <li @click="$emit('editCard')">
                <h1>{{ card.Title }}</h1>
                <p>{{ card.Content }}</p>
                <div class="myline">
                    <span v-for="tag in card.Tags" :class="getTagClass(tag)">{{ tag }}</span>
                </div>
                <span class="deletebtn actionbtn" @click="deleteCard();">
                    <a class="close" href="#"></a>
                </span>
                <span class="updatebbtn actionbtn" @click="updateCard">
                    <a class="updatebtn" href="#"></a>
                </span>
            </li>
        </div>
    </div>
</template>
    
<script setup>
import { defineProps, createApp } from 'vue';
import firebase from '../plugin/firebase';
import Modal from './Modal.vue';

const props = defineProps({
    card: Object,
});

const getTagClass = (tag) => {
    switch (tag) {
        case 'Important':
            return 'tagspan tagspan-important';
        case 'Warning':
            return 'tagspan tagspan-warning';
        default:
            return 'tagspan tagspan-default';
    }
};
function updateCard(self) {
    const app = createApp(Modal, {
        show: true,
        title: props.card.Title,
        content: props.card.Content,
        tags: props.card.Tags,
        id: props.card.id,
        newTag: ''
    })
    app.mount('#modal')
}

function deleteCard() {
    firebase.deleteCard(firebase.db, props.card.id).then(() => {
        location.reload();
    })
}

</script>
    
<style scoped>
.myCard {
    background: linear-gradient(to bottom right, #fffffF, #e0c6bb97);
    border-radius: 15px;
    padding: 30px;
    margin: 10px;
    max-width: 30vw;
}

.myCard:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.6);
}

.myCard h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

.myCard ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.myCard li {
    list-style: none;
    margin-bottom: 5px;
    position: relative;
}

.myCard .tagspan {
    margin: 5px;
    border-radius: 20px;
    padding: 5px 10px;
}

.myLine {
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
}

.tagspan-default {
    background-color: rgba(217, 226, 233, 0.59);
    color: black;
}

.tagspan-warning {
    background-color: #ffc247;
    color: white
}

.tagspan-important {
    background-color: #ff6347;
    color: white
}

.updatebtn {
    position: absolute;
    top: -24px;
    right: 27px;
    height: 22px;
    line-height: 20px;
    width: 22px;
    font-size: 2em;
    font-weight: bold;
    border-radius: 50%;
    background-color: #3499c2;
    color: white;
    text-align: center;
    cursor: pointer;
    opacity: 0.6;
}

/* DELETE */

/* .deletebtn {
    position: absolute;
    bottom: 10px;
    right: 3px;
} */
.actionbtn {
    margin: 50px;
}

.close {
    background-color: #ff6347;
    position: absolute;
    right: -6px;
    top: -25px;
    width: 22px;
    height: 22px;
    opacity: 0.6;
    cursor: pointer;
}

.close:hover,
.updatebtn:hover {
    opacity: 1;
}

.close:before,
.close:after {
    position: absolute;
    left: 10px;
    content: ' ';
    height: 12px;
    width: 2px;
    top: 5px;
    background-color: #333;
}

.close:before,
.updatebtn:before {
    transform: rotate(45deg);
}

.close:after {
    transform: rotate(-45deg);
}
</style>
  