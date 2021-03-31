import database from './firebase.js';
import firebase from 'firebase';
import Vue from 'vue';

export default {
    methods: {
        loadData: function() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    Vue.prototype.$userId = user.uid;
                    database.collection('restaurants').doc(this.$userId).get().then((doc) => {
                        if (doc.exists) {
                            Vue.prototype.$userData = doc.data();
                            Vue.prototype.$userEmail = this.$userData.email;
                            Vue.prototype.$userProfile = this.$userData.profile;
                            // console.log('rest exists', this.$userId, this.$userEmail, this.$userProfile, this.$userData);
                        } else {
                            // console.log('not restaurant, search customer db');
                            database.collection('customers').doc(this.$userId).get().then((doc) => {
                                console.log(doc.data());
                                if (doc.exists) {
                                    Vue.prototype.$userData = doc.data();
                                    Vue.prototype.$userEmail = this.$userData.email;
                                    Vue.prototype.$userProfile = this.$userData.profile;
                                    // console.log('cust exists', this.$userId, this.$userEmail, this.$userProfile, this.$userData);
                                }
                            })
                        }
                    })
                } else {
                    // console.log('not logged in');
                    Vue.prototype.$userId = '';
                    Vue.prototype.$userData = '';
                    Vue.prototype.$userEmail = '';
                    Vue.prototype.$userProfile = '';
                }
            })
        }
    },
    created() {
        this.loadData();
        // console.log('mixin')
    }
}