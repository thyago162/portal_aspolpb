<template>
  <b-overlay :show="loading">
    <b-container fluid class="mb-3">
      <b-row class="header-title ml-1 mr-1">
        <b-col class="title">
          <h5 class="mt-2">Novo cadastro</h5>
        </b-col>
      </b-row>

      <b-row class="mt-4 ml-1 mr-1">
        <b-col>
          <p>À Ilma. Sra. Presidente da Associação dos Policiais Civis de Carreira da Paraíba, VENHO, requerer a Vossa Senhoria deferimento da minha filiação nesta respeitada Associação, atendendo aos termos estatutários e legais.</p>
        </b-col>
      </b-row>

      <b-row class="mt-3 ml-1 mr-1">
        <b-col>
          <h5>
            <b>Dados Pessoais</b>
          </h5>
          <hr />
        </b-col>
      </b-row>

      <b-row class="mt-3 ml-1 mr-1">
        <b-col cols="11">
          <b-alert
            variant="warning"
            dismissible
            :show="true"
          >Os campos com asteriscos são obrigatórios</b-alert>

          <form @submit.stop.prevent="formSubmited">
            <b-form-group label="Matrícula *">
              <b-form-input
                type="text"
                v-model="form.nu_registration"
                placeholder="Matrícula"
                max="6"
                :state="state.registration"
              />
            </b-form-group>

            <b-form-group label="Nome">
              <b-form-input type="text" v-model="form.nm_name" placeholder="Nome completo" />
            </b-form-group>

            <b-form-group label="Cpf *">
              <b-form-input
                type="text"
                :state="state.cpf"
                v-model="form.nm_cpf"
                placeholder="Apenas números"
                max="11"
              />
            </b-form-group>

            <b-form-group label="Email">
              <b-form-input type="email" v-model="form.nm_email" />
            </b-form-group>

            <b-row>
              <b-col lg="3">
                <b-form-group label="DDD *">
                  <b-form-input
                    type="text"
                    v-model="form.nm_ddd"
                    placeholder="Apenas números"
                    :max="2"
                    :state="state.ddd"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Telefone *">
                  <b-form-input
                    type="text"
                    v-model="form.nm_phone"
                    placeholder="Apenas números"
                    :max="9"
                    :state="state.phone"
                  />
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group label="Sexo *">
              <b-form-select v-model="form.ch_sex" :state="state.sex">
                <b-form-select-option value="M">Masculino</b-form-select-option>
                <b-form-select-option value="F">Feminino</b-form-select-option>
              </b-form-select>
            </b-form-group>

            <b-form-group label="Cédula de identidade (RG) *">
              <b-form-input
                :state="state.rg"
                type="number"
                v-model="form.nu_rg"
                placeholder="Apenas números"
                max="7"
              />
            </b-form-group>

            <b-form-group label="Data de nascimento *">
              <b-form-input type="date" :state="state.date" v-model="form.dt_birthday" />
            </b-form-group>

            <b-form-group label="Estado Civil *">
              <b-form-select v-model="form.nm_civil_state" :state="state.civilState">
                <b-form-select-option value="solteiro">Solteiro(a)</b-form-select-option>
                <b-form-select-option value="casado">Casado(a)</b-form-select-option>
                <b-form-select-option value="separado">Separado(a)</b-form-select-option>
                <b-form-select-option value="divorciado">Divorciado(a)</b-form-select-option>
                <b-form-select-option value="separado">Viúvo(a)</b-form-select-option>
                <b-form-select-option value="união estável">Em união estável</b-form-select-option>
              </b-form-select>
            </b-form-group>

            <b-form-group label="Grau de Escolaridade *">
              <b-form-select v-model="form.nm_education_level" :state="state.educationLevel">
                <b-form-select-option value="Ensino Superior (Completo)">Ensino Superior (completo)</b-form-select-option>
                <b-form-select-option
                  value="Ensino Superior (Incompleto)"
                >Ensino Superior (incompleto)</b-form-select-option>
                <b-form-select-option value="Ensino Médio (Completo)">Ensino Médio (Completo)</b-form-select-option>
                <b-form-select-option value="Ensino Médio (Incompleto)">Ensino Médio (Incompleto)</b-form-select-option>
                <b-form-select-option
                  value="Pós Graduação (Especialização Completo)"
                >Pós Graduação (Especialização Completo)</b-form-select-option>
                <b-form-select-option
                  value="Pós Graduação (Especialização Incompleto)"
                >Pós Graduação (Especialização Incompleto)</b-form-select-option>
                <b-form-select-option
                  value="Pós Graduação (Mestrado Completo)"
                >Pós Graduação (Mestrado Completo)</b-form-select-option>
                <b-form-select-option
                  value="Pós Graduação (Mestrado Incompleto)"
                >Pós Graduação (Mestrado Incompleto)</b-form-select-option>
                <b-form-select-option
                  value="Pós Graduação (Doutorado Completo)"
                >Pós Graduação (Doutorado Completo)</b-form-select-option>
                <b-form-select-option
                  value="Pós Graduação (Doutorado Incompleto)"
                >Pós Graduação (Doutorado Incompleto)</b-form-select-option>
                <b-form-select-option
                  value="Pós Graduação (Pós Doutorado Completo)"
                >Pós Graduação (Pós Doutorado Completo)</b-form-select-option>
                <b-form-select-option
                  value="Pós Graduação (Pós Doutorado Incompleto)"
                >Pós Graduação (Pós Doutorado Incompleto)</b-form-select-option>
              </b-form-select>
            </b-form-group>

            <b-row class="mt-3">
              <b-col>
                <h5>
                  <b>Endereço</b>
                </h5>
                <hr />
              </b-col>
            </b-row>

            <b-form-group label="Cep" class="mt-3">
              <b-input-group>
                <b-form-input trim placeholder="Apenas números" v-model="form.nm_cep" type="text" />
                <b-input-group-append>
                  <b-button variant="default" @click="searchCep">
                    <b-icon icon="search"></b-icon>Buscar
                    <b-spinner small label="Small Spinner" class="ml-1" v-show="loadingAddress"></b-spinner>
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>

            <b-form-group label="Rua">
              <b-form-input v-model="form.nm_street" />
            </b-form-group>

            <b-row>
              <b-col lg="3">
                <b-form-group label="Número">
                  <b-form-input v-model="form.nm_number" />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Complemento">
                  <b-form-input v-model="form.nm_complement" type="text" />
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group label="Bairro">
              <b-form-input placeholder v-model="form.nm_neighbohood" />
            </b-form-group>

            <b-form-group label="Estado *">
              <b-form-select v-model="form.nm_uf" @input="getCities()" :state="state.uf">
                <b-form-select-option
                  v-for="(uf, index) in ufs"
                  :key="index"
                  :value="uf.sigla"
                >{{uf.nome}}</b-form-select-option>
              </b-form-select>
            </b-form-group>

            <b-form-group label="Cidade *">
              <b-form-select v-model="form.nm_city" :state="state.city">
                <b-form-select-option
                  v-for="(city, index) in cities"
                  :key="index"
                  :value="city.nome"
                >{{city.nome}}</b-form-select-option>
              </b-form-select>
            </b-form-group>

            <b-row class="mt-3">
              <b-col>
                <h5>
                  <b>Dados profissionais</b>
                </h5>
              </b-col>
            </b-row>

            <b-form-group label="Cargo *" class="mt-3">
              <b-form-select v-model="form.nm_office" :state="state.office">
                <b-form-select-option value="Agente de Investigação">Agente de Investigação</b-form-select-option>
                <b-form-select-option value="Escrivão da Polícia">Escrivão da Polícia</b-form-select-option>
                <b-form-select-option value="Agente Operacional">Agente Operacional</b-form-select-option>
                <b-form-select-option value="Delegado da Polícia">Delegado da Polícia</b-form-select-option>
                <b-form-select-option value="Necrotomista">Necrotomista</b-form-select-option>
                <b-form-select-option value="Papiloscopia">Papiloscopia</b-form-select-option>
                <b-form-select-option value="Perito Oficial Criminal">Perito Oficial Criminal</b-form-select-option>
                <b-form-select-option
                  value="Períto Oficial Médico-Legal"
                >Períto Oficial Médico-Legal</b-form-select-option>
                <b-form-select-option
                  value="Períto Oficial Odonto-Legal"
                >Períto Oficial Odonto-Legal</b-form-select-option>
                <b-form-select-option
                  value="Períto Oficial Químico-Lgeal"
                >Períto Oficial Químico-Lgeal</b-form-select-option>
                <b-form-select-option value="Técnico em Perícia">Técnico em Perícia</b-form-select-option>
                <b-form-select-option value="Agente de Telecomunicação">Agente de Telecomunicação</b-form-select-option>
              </b-form-select>
            </b-form-group>

            <b-form-group label="Classe">
              <b-form-select v-model="form.nm_office_class" :state="state.officeClass">
                <b-form-select-option value="1º">1º</b-form-select-option>
                <b-form-select-option value="2º">2º</b-form-select-option>
                <b-form-select-option value="3º">3º</b-form-select-option>
                <b-form-select-option value="E">E</b-form-select-option>
              </b-form-select>
            </b-form-group>

            <b-form-group label="Lotação (Superintendência)">
              <b-form-select v-model="form.nm_super_stocking" :state="state.superStocking">
                <b-form-select-option value="1º">1º</b-form-select-option>
                <b-form-select-option value="2º">2º</b-form-select-option>
                <b-form-select-option value="3º">3º</b-form-select-option>
                <b-form-select-option value="Outra">Outra</b-form-select-option>
              </b-form-select>
            </b-form-group>

            <b-form-group label="Lotação (Seccional)">
              <b-form-select v-model="form.nm_sectional_stocking" :state="state.sectionalStokng">
                <b-form-select-option
                  v-for="(sectional, index) in sectionalStocking"
                  :key="index"
                  :value="sectional"
                >{{sectional}}</b-form-select-option>
              </b-form-select>
            </b-form-group>

            <b-form-group label="Unidade em que trabalha">
              <b-form-input v-model="form.nm_work_unit" type="text" />
            </b-form-group>

            <b-form-group label="Município da Unidade que trabalha" :state="state.workUnity">
              <b-form-input type="text" v-model="form.nm_municipality_work_unit" />
            </b-form-group>

            <b-row>
              <b-col>
                <h5>
                  <b>Dependentes</b>
                </h5>
              </b-col>
            </b-row>

            <b-row>
              <b-col lg="7">
                <b-form-group label="Nome do Dependente ">
                  <b-form-input v-model="dependentName" />
                </b-form-group>
              </b-col>
              <b-col lg="5">
                <b-form-group label="Data de Nascimento">
                  <b-form-input type="date" v-model="dependentBirthday" />
                </b-form-group>
              </b-col>
              <b-col>
                <b-button
                  variant="success"
                  @click="addDependents"
                  :style="{float: 'right'}"
                >Adicionar dependente</b-button>
              </b-col>
            </b-row>

            <b-row class="mt-4" v-if="dependents">
              <b-col>
                <b-table :fields="fields" :items="dependents" striped hover></b-table>
              </b-col>
            </b-row>

            <b-form-group label="Autorizar" class="mt-5">
              <b-form-checkbox
                v-model="form.authorize"
                :value="1"
                :unchecked-value="0"
                required
              >Autorizo descontar a contribuição conforme estabelecido na alínea "c", do art. 4º, do estatuto social desta entidade, em folha de pagamento ou débito em conta bancária, bem como contribuições extraordinárias votadas em Assembléia em favor da Aspol/PB.</b-form-checkbox>
            </b-form-group>

            <b-row>
              <b-col class="buttons">
                <b-button variant="success" @click="formSubmited()">Salvar</b-button>
              </b-col>
            </b-row>
          </form>
        </b-col>
      </b-row>

      <ModalError ref="error" :errors="errors" />
    </b-container>
  </b-overlay>
</template>

<script>
import ModalError from "../error/ModalError";
import { validate } from "../../config";

export default {
  created() {
    this.getUfs();
  },

  components: {
    ModalError,
  },

  data() {
    return {
      form: {
        nu_registration: "",
        nm_name: "",
        nm_cpf: "",
        nm_email: "",
        nm_ddd: "",
        nm_phone: "",
        ch_sex: "",
        nu_rg: "",
        dt_birthday: "",
        nm_civil_state: "",
        nm_education_level: "",
        nm_office: "",
        nm_office_class: "",
        nm_super_stocking: "",
        nm_sectional_stocking: "",
        nm_work_unit: "",
        nm_municipality_work_unit: "",
        nm_cep: "",
        nm_street: "",
        nm_number: "",
        nm_complement: "",
        nm_neighbohood: "",
        nm_city: "",
        nm_uf: "",
        authorize: 0
      },
      cities: [],
      ufs: [],
      dependents: [],
      dependentName: "",
      dependentBirthday: "",
      fields: [
        { key: "name", label: "Nome" },
        { key: "birthday", label: "Data de nascimento" }
      ],
      errors: {},
      loading: false,
      visibility: false,
      loadingAddress: false,
      state: {}
    };
  },

  computed: {
    sectionalStocking: function() {
      let sectional = new Array();

      for (var i = 1; i <= 20; i++) {
        sectional.push(i + "º");
      }

      return sectional;
    },

    user: function() {
      return this.$session.get("user");
    },

    token: function() {
      return this.$session.get("jwt");
    }
  },

  methods: {
    searchCep() {
      this.loadingAddress = true;
      let cep = this.form.nm_cep;

      this.$http("http://viacep.com.br/ws/" + cep + "/json/").then(res => {
        if (res.status === 200) {
          let result = res.data;
          this.form.nm_street = result.logradouro;
          this.form.nm_complement = result.complemento;
          this.form.nm_neighbohood = result.bairro;
          this.form.nm_city = result.localidade;
          this.form.nm_uf = result.uf;

          this.loadingAddress = false;
        }
      });
    },

    formSubmited() {
      this.loading = true;
      this.requiredFields();
      let form = new FormData();

      form.append("nu_registration", this.form.nu_registration);
      form.append("nm_name", this.form.nm_name);
      form.append("nm_cpf", this.form.nm_cpf);
      form.append("nm_email", this.form.nm_email);
      form.append("nm_ddd", this.form.nm_ddd);
      form.append("nm_phone", this.form.nm_phone);
      form.append("ch_sex", this.form.ch_sex);
      form.append("nu_rg", this.form.nu_rg);
      form.append("dt_birthday", this.form.dt_birthday);
      form.append("nm_civil_state", this.form.nm_civil_state);
      form.append("nm_education_level", this.form.nm_education_level);
      form.append("nm_office", this.form.nm_office);
      form.append("nm_office_class", this.form.nm_office_class);
      form.append("nm_super_stocking", this.form.nm_super_stocking);
      form.append("nm_sectional_stocking", this.form.nm_sectional_stocking);
      form.append("nm_work_unit", this.form.nm_work_unit);
      form.append(
        "nm_municipality_work_unit",
        this.form.nm_municipality_work_unit
      );
      form.append("st_confirmation", this.form.authorize);
      form.append("id_address", this.form.fk_address);
      form.append("nm_cep", this.form.nm_cep);
      form.append("nm_street", this.form.nm_street);
      form.append("nm_number", this.form.nm_number);
      form.append("nm_neighbohood", this.form.nm_neighbohood);
      form.append("nm_city", this.form.nm_city);
      form.append("nm_complement", this.form.nm_complement);
      form.append("nm_uf", this.form.nm_uf);
      form.append("st_active", 0);

      this.$http
        .post("associated", form, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          if (res.status === 200) {
            if (res.data.result.error) {
              this.errors = res.data.result;
              this.$refs.error.$refs["modal-error"].show();
            } else {
              if (this.dependents.length > 0) {
                this.dependents.forEach(item => {
                  let form = new FormData();
                  form.append("nm_dependent_name", item.name);
                  form.append("dt_dependent_birthday", item.birthday);
                  form.append(
                    "fk_associated",
                    res.data.result.associated.id_associated
                  );

                  this.$http
                    .post("associated-dependent", form)
                    .then(res => {
                      if (res.status === 200) {
                        this.loading = false;

                        if (res.data.result.error) {
                          this.errors = res.data.result;
                          this.$refs.error.$refs["modal-error"].show();
                        } else {
                          alert("Solicitação de cadastro enviada com sucesso!");
                          this.$router.push({ name: "home" });
                        }
                      }
                    })
                    .catch(err => {
                      this.errors.push(err);
                    });
                });
              }
              alert("Solicitação de cadastro enviada com sucesso!");
              this.$router.push({ name: "home" });
            }
          }
        });
    },

    addDependents() {
      let dependentList = new Array();

      dependentList["name"] = this.dependentName;
      dependentList["birthday"] = this.dependentBirthday;

      this.dependents.push(dependentList);
    },

    next() {
      if (this.formControl <= 4) {
        parseInt((this.formControl += 1));
      }
    },

    preview() {
      if (this.formControl > 1) {
        parseInt((this.formControl -= 1));
      }
    },
    getUfs() {
      this.$http(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      ).then(res => {
        if (res.status === 200) {
          this.ufs = res.data;
        }
      });
    },

    getCities() {
      this.$http(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" +
          this.form.nm_uf +
          "/municipios"
      ).then(res => {
        if (res.status === 200) {
          this.cities = res.data;
        }
      });
    },

    requiredFields() {
      this.state.registration = validate(this.form.nu_registration);
      this.state.cpf = validate(this.form.nm_cpf);
      this.state.ddd = validate(this.form.nm_ddd);
      this.state.phone = validate(this.form.nm_phone);
      this.state.sex = validate(this.form.ch_sex);
      this.state.rg = validate(this.form.nu_rg);
      this.state.date = validate(this.form.dt_birthday);
      this.state.civilState = validate(this.form.nm_civil_state);
      this.state.educationLevel = validate(this.form.educationLevel);
      this.state.city = validate(this.form.nm_city);
      this.state.uf = validate(this.form.nm_uf);
      this.state.office = validate(this.form.nm_office);
      this.state.officeClass = validate(this.form.nm_office_class);
      this.state.sectionalStocking = validate(this.form.sectionalStocking);
      this.state.superStocking = validate(this.form.nm_super_stocking);
      this.state.workUnity = validate(this.form.nm_work_unit);
    }
  }
};
</script>