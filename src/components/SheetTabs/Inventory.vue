<template>
  <v-col>
    <v-row no-gutters>
      <h2>
        {{ character.name }}
      </h2>
    </v-row>

    <v-row justify="center" no-gutters>
      <v-expansion-panels flat>
        <v-expansion-panel class="ma-1 expansion-panel">
          <v-divider></v-divider>

          <v-row justify="space-between" no-gutters>
            <v-expansion-panel-header
              color="#eeeeee"
              expand-icon="mdi-menu-down"
              class="px-0"
              style="max-width: 90%"
              >Inventário</v-expansion-panel-header
            >
            <v-icon
              v-if="!isInventoryEditable"
              @click="isInventoryEditable = true"
              >mdi-pencil</v-icon
            >
            <v-icon v-else @click="updateInjuries()" color="primary"
              >mdi-check</v-icon
            >
          </v-row>

          <v-expansion-panel-content
            v-if="!isInventoryEditable"
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div
              v-for="(item, index) in modifiedSheet.inventory"
              @click="showItemDescription(item)"
              :key="index"
            >
              {{ item.quantity + "x " + item.name }}
              <div class="description">
                {{ truncateDescription(item.description) }}
              </div>
            </div>
            <div class="empty-string" v-if="!modifiedSheet.inventory">
              {{ modifiedSheet.name + " não tem inventário" }}
              <v-btn icon color="#9a9a9a" @click="showEmptyInventoryDialog()"
                ><v-icon>mdi-information-outline</v-icon></v-btn
              >
            </div>
          </v-expansion-panel-content>

          <v-expansion-panel-content
            v-else
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div v-for="(item, index) in inventory" :key="index">
              <v-row>
                <div style="display: flex">
                  <v-col cols="2">
                    <v-text-field
                      dense
                      hide-details
                      type="number"
                      label="Qtde."
                      v-model="item.quantity"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      dense
                      hide-details
                      label="Nome"
                      v-model="item.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-btn fab x-small color="#DC2626">
                      <v-icon color="#eeeeee" @click="removeItem(index)">
                        mdi-close
                      </v-icon>
                    </v-btn>
                  </v-col>
                </div>
              </v-row>
              <div class="description">
                <v-textarea
                  v-model="item.description"
                  label="Descrição"
                ></v-textarea>
              </div>
            </div>
            <div class="add-button">
              <v-btn class="mx-2 mb-1" fab x-small color="primary">
                <v-icon @click="isNewItemDialogVisible = true">
                  mdi-plus
                </v-icon>
              </v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

    <MessageDialog
      :is-dialog-visible="messageDialog.isVisible"
      :title="messageDialog.title"
      :message="messageDialog.message"
      buttonText="Okay"
      @close-dialog="messageDialog.isVisible = false"
    ></MessageDialog>

    <NewItemDialog
      :isDialogVisible="isNewItemDialogVisible"
      @create-new-item="onCreateNewItem"
      @close-dialog="isNewItemDialogVisible = false"
    ></NewItemDialog>
  </v-col>
</template>

<script>
import MessageDialog from "@/components/Dialogs/MessageDialog";
import NewItemDialog from "@/components/Dialogs/NewItemDialog";

export default {
  name: "Inventory",
  components: {
    MessageDialog,
    NewItemDialog
  },
  props: {
    character: Object
  },
  data() {
    return {
      modifiedSheet: null,
      isInventoryEditable: false,
      inventory: [],
      messageDialog: {
        isVisible: false,
        title: "",
        message: ""
      },
      isNewItemDialogVisible: false
    };
  },
  created() {
    this.modifiedSheet = this.character;
    if (this.character.inventory) {
      this.inventory = this.character.inventory;
    }
  },
  methods: {
    updateInjuries() {
      this.isInventoryEditable = false;

      this.modifiedSheet.inventory = this.inventory;

      this.$emit("update-sheet", this.modifiedSheet);
    },
    onCreateNewItem(newItem) {
      this.inventory.push(newItem);
    },
    removeItem(index) {
      this.inventory.splice(index, 1);
    },
    showEmptyInventoryDialog() {
      this.messageDialog = {
        isVisible: true,
        title: "Inventário",
        message: "Para adicionar ou editar itens, clique no botão de editar"
      };
    },
    showItemDescription(item) {
      this.messageDialog = {
        isVisible: true,
        title: item.name,
        message: item.description
      };
    },
    truncateDescription(description) {
      if (description.length > 36) {
        return description.slice(0, 36) + "...";
      } else {
        return description;
      }
    }
  }
};
</script>

<style>
.description {
  font-style: italic;
  color: #828282;
}
</style>
