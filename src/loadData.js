import database from './firebase.js';
import firebase from 'firebase';
import Vue from 'vue';

export default {
    methods: {
        loadData: function() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    Vue.prototype.$userUid = user.uid;
                    database.collection('restaurants').doc(this.$userUid).get().then((doc) => {
                        if (doc.exists) {
                            Vue.prototype.$userData = doc.data();
                            Vue.prototype.$userId = this.$userData.email;
                            Vue.prototype.$userProfile = this.$userData.profile;
                            // console.log('rest exists', this.$userUid, this.$userId, this.$userProfile, this.$userData);
                        } else {
                            // console.log('not restaurant, search customer db');
                            database.collection('customers').doc(this.$userUid).get().then((doc) => {
                                // console.log(doc.data());
                                if (doc.exists) {
                                    Vue.prototype.$userData = doc.data();
                                    Vue.prototype.$userId = this.$userData.email;
                                    Vue.prototype.$userProfile = this.$userData.profile;
                                    // console.log('cust exists', this.$userUid, this.$userId, this.$userProfile, this.$userData);
                                }
                            })
                        }
                    })
                } else {
                    // console.log('not logged in');
                    Vue.prototype.$userUid = '';
                    Vue.prototype.$userData = '';
                    Vue.prototype.$userId = '';
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