<template>
  <v-col>
    <v-row no-gutters>
      <h2>
        {{ character.name }}
      </h2>
      <v-spacer></v-spacer>
      <v-icon
        v-if="!isGeneralInfoEditable"
        @click="isGeneralInfoEditable = true"
        >mdi-pencil</v-icon
      >
      <v-icon v-else @click="isGeneralInfoEditable = false" color="primary"
        >mdi-check</v-icon
      >
    </v-row>
    <p>
      Raça: {{ character.race }}<br />
      Altura: {{ character.height }}<br />
      Idade: {{ character.age }}<br />
      Pontos: {{ character.points }}<br />
      Dinheiro: {{ character.money }}<br />
      Mesa: {{ character.party }}
    </p>
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
              >Atributos</v-expansion-panel-header
            >
            <v-icon
              v-if="!isAttributesEditable"
              @click="isAttributesEditable = true"
              >mdi-pencil</v-icon
            >
            <v-icon v-else @click="isAttributesEditable = false" color="primary"
              >mdi-check</v-icon
            >
          </v-row>

          <v-expansion-panel-content
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div
              v-for="(attribute, index) in character.attributes"
              :key="index"
            >
              {{ attribute.name + ": " + attribute.level }}
              <v-progress-linear
                color="primary"
                :value="attribute.level * 5"
              ></v-progress-linear>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="ma-1 expansion-panel">
          <v-divider></v-divider>

          <v-row justify="space-between" no-gutters>
            <v-expansion-panel-header
              color="#eeeeee"
              expand-icon="mdi-menu-down"
              class="px-0"
              style="max-width: 90%"
              >Competências</v-expansion-panel-header
            >
            <v-icon v-if="!isSkillsEditable" @click="isSkillsEditable = true"
              >mdi-pencil</v-icon
            >
            <v-icon v-else @click="isSkillsEditable = false" color="primary"
              >mdi-check</v-icon
            >
          </v-row>

          <v-expansion-panel-content
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div v-for="(skill, index) in character.skills" :key="index">
              {{ skill.name + ": " + skill.level }}
              <v-progress-linear
                color="primary"
                :value="skill.level * 5"
              ></v-progress-linear>
            </div>
            <div v-if="!character.skills">
              {{ character.name + " ainda não tem competências" }}
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="ma-1 expansion-panel">
          <v-divider></v-divider>

          <v-row justify="space-between" no-gutters>
            <v-expansion-panel-header
              color="#eeeeee"
              expand-icon="mdi-menu-down"
              class="px-0"
              style="max-width: 90%"
              >Traços</v-expansion-panel-header
            >
            <v-icon v-if="!isTraitsEditable" @click="isTraitsEditable = true"
              >mdi-pencil</v-icon
            >
            <v-icon v-else @click="isTraitsEditable = false" color="primary"
              >mdi-check</v-icon
            >
          </v-row>

          <v-expansion-panel-content
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div v-for="(trait, index) in character.traits" :key="index">
              {{ trait.name }}
            </div>
            <div v-if="!character.skills">
              {{ character.name + " ainda não tem traços" }}
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "MainInfo",
  props: {
    character: Object
  },
  data() {
    return {
      isGeneralInfoEditable: false,
      isAttributesEditable: false,
      isSkillsEditable: false,
      isTraitsEditable: false
    };
  }
};
</script>

<style></style>
