<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-icon @click="$router.go(-1)">mdi-arrow-left</v-icon>

        <v-form>
          <v-text-field label="Email" v-model="email" readonly></v-text-field>
          <v-text-field
            label="Nome de usuário"
            v-model="username"
            required
          ></v-text-field>
          <v-text-field
            label="Senha antiga"
            type="password"
            v-model="oldPassword"
            required
          ></v-text-field>
          <v-text-field
            label="Nova senha"
            type="password"
            v-model="newPassword"
            required
          ></v-text-field>
          <v-text-field
            label="Confirmação da senha"
            type="password"
            v-model="newPasswordConfirmation"
            required
          ></v-text-field>
          <v-btn elevation="2" @click="onClickSaveButton()">Salvar</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="space-around" class="mt-4">
      <v-btn elevation="2" @click="isDialogVisible = true">Apagar conta</v-btn>
      <v-btn elevation="2" @click="signOut()">Logout</v-btn>
    </v-row>

    <v-dialog v-model="isDialogVisible"
      ><v-card
        ><v-card-title>Apagar a conta?</v-card-title
        ><v-card-text
          >Essa ação não pode ser desfeita.<br />
          Para prosseguir, digite sua senha:
          <v-text-field
            label="Senha"
            type="password"
            v-model="passwordToDelete"
            required
          ></v-text-field> </v-card-text
        ><v-card-actions>
          <v-btn elevation="2" @click="isDialogVisible = false">Cancelar</v-btn>
          <v-btn elevation="2" @click="deleteUser(passwordToDelete)"
            >Confirmar</v-btn
          >
        </v-card-actions></v-card
      ></v-dialog
    >

    <MessageDialog
      :is-dialog-visible="isMessageDialogVisible"
      title="Erro"
      :message="error"
      buttonText="Okay"
      @close-dialog="isMessageDialogVisible = false"
    />
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import MessageDialog from "@/components/MessageDialog";

export default {
  name: "Settings",
  components: {
    MessageDialog
  },
  data() {
    return {
      error: "",
      isDialogVisible: false,
      isMessageDialogVisible: false,
      email: "",
      username: "",
      oldPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
      passwordToDelete: ""
    };
  },
  created() {
    this.email = this.$store.state.user.user.email;
    this.username = this.$store.state.user.user.username;
  },
  methods: {
    onClickSaveButton() {
      this.updateUser(
        this.username,
        this.oldPassword,
        this.newPassword,
        this.newPasswordConfirmation
      );
    },
    updateUser(username, oldPassword, newPassword, newPasswordConfirmation) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase
            .auth()
            .currentUser.updateProfile({
              displayName: username
            })
            .then(() => {
              firebase
                .database()
                .ref("users/" + firebase.auth().currentUser.uid + "/profile")
                .set({
                  userName: username
                });
            })
            .catch(error => {
              this.error = error.message;
              this.isMessageDialogVisible = true;
            });

          if (newPassword != null && newPassword === newPasswordConfirmation) {
            var credential = firebase.auth.EmailAuthProvider.credential(
              firebase.auth().currentUser.email,
              oldPassword
            );

            firebase
              .auth()
              .currentUser.reauthenticateWithCredential(credential)
              .then(() => {
                firebase
                  .auth()
                  .currentUser.updatePassword(newPassword)
                  .catch(error => {
                    this.error = error.message;
                    this.isMessageDialogVisible = true;
                    return;
                  });
                this.oldPassword = "";
                this.newPassword = "";
                this.newPasswordConfirmation = "";
              })
              .catch(error => {
                this.error = error.message;
                this.isMessageDialogVisible = true;
              });
          }
        }
      });
    },
    deleteUser(password) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          var credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            password
          );

          firebase
            .auth()
            .currentUser.reauthenticateWithCredential(credential)
            .then(() => {
              firebase
                .auth()
                .currentUser.delete()
                .catch(errorHandle => {
                  console.log(errorHandle);
                });
            })
            .catch(errorHandle => {
              console.log(errorHandle);
            });
        }
      });
    },
    signOut() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase
            .auth()
            .signOut()
            .then(() => {
              const emptyUser = {
                email: "",
                username: ""
              };
              this.$store.commit("setUser", emptyUser);
              this.$store.commit("setIsLogged", false);
            })
            .catch(errorHandle => {
              console.log(errorHandle);
            });
        }
      });
    }
  }
};
</script>

<style scoped>
#app {
  margin: auto;
}

.container {
  margin: auto;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.col-md-4 {
  margin-left: auto;
  margin-right: auto;
}
</style>
