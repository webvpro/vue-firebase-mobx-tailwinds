<template>
    <div class="bg-gray-300 min-h-screen w-screen flex flex-col">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <form ref="form" @submit.prevent="submit"
                class="card"
            >
                <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                <ul role="alert" v-if="errors.length"  class="border border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700 list-disc">
                    <li v-for="error in errors" :key="error" class="m-1 ml-2">
                        <p>{{error}}</p>
                    </li>
                </ul>
                <input 
                    type="email"
                    class="block border border-gray-300 w-full p-3 rounded mb-4"
                    name="email"
                    v-model="email"
                    placeholder="Email"
                    required />

                <input 
                    type="password"
                    class="block border border-gray-300 w-full p-3 rounded mb-4"
                    name="password"
                    v-model="password"
                    placeholder="Password"
                    required />
                <button
                    type="submit"
                    class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-800 focus:outline-none my-1"
                >Create Account</button>

                <div class="text-center text-sm text-gray-800 mt-4">
                    By signing up, you agree to the 
                    <a class="no-underline border-b border-gray-dark text-gray-800" href="#">
                        Terms of Service
                    </a> and 
                    <a class="no-underline border-b border-gray-800 text-gray-800" href="#">
                        Privacy Policy
                    </a>
                </div>
            </form>

            <div class="text-gray-800 mt-6">
                <router-link to="/login" tag="button" class="btn btn--primary w-64">Sign In</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { Auth } from '../../firebase/auth';
    import { db } from '../../firebase/db';
    
    export default {
    name: 'register',
    data() {
        return {
        email: '',
        password: '',
        confirm_password: '',
        errors: [],
        };
    },
    methods: {
        submit(event) {
            event.target.classList.add('was-validated');
            this.errors = [];
            Auth.createUserWithEmailAndPassword(this.email, this.password)
            .then(cred => {
                db.collection('user').doc(cred.user.uid).set({
                    role: 'user',
                    verified: false,
                });
                return cred
            })
            .then(() => {
                Auth.currentUser.sendEmailVerification({
                    url: 'https://stormbringer.io/verified',
                    dynamicLinkDomain: 'stormbringer.io'
                }).then(() => {
                    this.$router.push('/unverified');
                });
            }).catch((error) => {
                this.errors.push(error.message);
            });
        },
        handleSignup() {
            console.log("do task before submit");
            if (this.$refs.form.checkValidity()) {
                this.submit();
            } else {
                this.$refs.form.reportValidity();
            }
        }
    }};
</script>