<template>
  <b-container>
    <b-row>
      <b-col>
        <b-table :items="item" :fields="fields" borderless>
          <template v-slot:cell(show_details)="row" hover striped>
            <b-card no-body>
              <b-card-header>
                <b-row>
                  <b-col cols="9">
                      <b-card-title>
                          {{row.item.nm_management_name}}
                      </b-card-title>
                  </b-col>
                  <b-col>
                    <b-button
                      variant="info"
                      size="sm"
                      @click="row.toggleDetails"
                      class="mr-2"
                    >{{ row.detailsShowing ? 'Menos' : 'Mais'}} Detalhes</b-button>
                    <b-button variant="warning" 
                      @click="$router.push({name: 'form-transparency', params: {id: row.item.id_transparency}})">
                      Editar
                    </b-button>
                  </b-col>
                </b-row>
              </b-card-header>
            </b-card>
          </template>

          <template v-slot:row-details="row">
            <b-card>
                <b-tabs>
                    <b-tab title="Detalhes">
                      <TransparencyCard :item="row.item" />
                    </b-tab>
                    <b-tab title="Adicionar documento">
                      <TransparencyFileForm :id="row.item.id_transparency"/>
                    </b-tab>
                </b-tabs>
            </b-card>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TransparencyFileForm from '../../components/transparency/TransparencyFileForm';
import TransparencyCard from '../../components/transparency/TransparencyCard';
export default {
  props: ["item"],
  components: {
    TransparencyFileForm,
    TransparencyCard
  },

  data() {
    return {
      fields: [{ key: "show_details", label: "" }]
    };
  }
};
</script>