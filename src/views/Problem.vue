<template>
  <div style="display: flex; justify-content: center; height: 100%; overflow: hidden;">
    <div style="flex: 1; padding: 20px 50px; overflow-x: hidden; overflow-y: scroll;">
      <div v-if="$store.getters.isLogin">
        <h3 style="font-weight: 500; font-size: 30px; margin: 0;">제출 기록</h3>
        <div>
          <div style="font-weight: 500; border: none;" class="prob-list-row">
            <p style="width: 25%;">#</p>
            <p style="width: 35%;">결과</p>
            <p style="width: 40%; text-align: right;">제출 시간</p>
          </div>
          <div v-for="{submission_id, judge_result, date} in recentSubmissionList"
               style="font-weight: 300; cursor: inherit;"
               class="flatten-btn prob-list-row" :id="submission_id">
            <p style="width: 25%;">{{ submission_id }}</p>
            <p style="width: 35%;">{{ verdictToString(judge_result.verdict) }}</p>
            <p style="width: 40%; text-align: right;">{{ (new Date(date)).toLocaleString() }}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 style="font-weight: 500; font-size: 45px; margin-bottom: 16px;">{{ problemData.title }}</h1>
        <hr width="100%" color="black" style="margin-bottom: 36px;">
        <article>
          <h3 style="font-weight: 600; font-size: 30px; margin: 0;">문제</h3>
          <p style="margin: 5px 0 20px 0;">{{ problemData.statement?.body }}</p>
          <section v-for="({input, output}, i) in problemData.statement?.example" :id="i">
            <h3 style="font-weight: 600; font-size: 25px; margin: 0;">예제 {{ i + 1 }}</h3>
            <h5 style="font-weight: 600; font-size: 20px; margin: 0;">입력</h5>
            <pre style="margin: 5px 0 20px 0;">{{ input }}</pre>
            <h5 style="font-weight: 600; font-size: 20px; margin: 0;">출력</h5>
            <pre style="margin: 5px 0 20px 0;">{{ output }}</pre>
          </section>
        </article>
      </div>
    </div>
    <div
        style="flex: 1; height: 100%; border-left: 1px solid black; z-index: 50; display: flex; flex-direction: column;">
      <div style="height: 100%;" class="blockly" ref="blockly">
      </div>
      <xml ref="blocklyToolbox" style="display: none;">
        <slot></slot>
      </xml>
      <div style="display: flex; justify-content: space-around; margin: 10px;">
        <!-- <button>테스트케이스 추가하기</button> -->
        <button @click="" style="display: none;">테스트</button>
        <button @click="submit">제출</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import BlocklyComponent from "@/component/BlocklyComponent";
import '@/prompt';
import Blockly from 'blockly';
import verdict from '@/verdict';

export default {
  name: 'Problem',
  components: {
    BlocklyComponent
  },
  computed: {
    problemId() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      verdictToString: verdict.toString,
      workspace: null,
      sendData: null,
      lastData: null,
      saveId: null,
      recentSubmissionList: [],
      problemData: {},
      options: {
        media: 'https://blockly-demo.appspot.com/static/media/',
        collapse: true,
        comments: true,
        disable: true,
        maxBlocks: Infinity,
        trashcan: true,
        horizontalLayout: false,
        css: true,
        rtl: false,
        scrollbars: true,
        sounds: true,
        oneBasedIndex: true,
        grid: {
          spacing: 20,
          length: 1,
          colour: '#888',
          snap: false
        },
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2
        },
        toolbox:
            `<xml>
          <category name="Logic" colour="%{BKY_LOGIC_HUE}">
            <block type="controls_if"></block>
            <block type="logic_compare"></block>
            <block type="logic_operation"></block>
            <block type="logic_negate"></block>
            <block type="logic_boolean"></block>
          </category>
          <category name="Loops" colour="%{BKY_LOOPS_HUE}">
            <block type="controls_repeat_ext">
              <value name="TIMES">
                <block type="math_number">
                  <field name="NUM">10</field>
                </block>
              </value>
            </block>
            <block type="controls_whileUntil"></block>
          </category>
          <category name="Math" colour="%{BKY_MATH_HUE}">
            <block type="math_number">
              <field name="NUM">123</field>
            </block>
            <block type="math_arithmetic"></block>
            <block type="math_single"></block>
          </category>
          <category name="Text" colour="%{BKY_TEXTS_HUE}">
            <block type="text"></block>
            <block type="text_length"></block>
            <block type="text_print"></block>
          </category>
          <category name="Variables" custom="VARIABLE" colour="%{BKY_VARIABLES_HUE}">
          </category>
        </xml>`
      },
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.saveId !== null) clearInterval(this.saveId);
  },
  methods: {
    getBlocklyXML() {
      return Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
    },
    async submit() {
      if (!this.$store.getters.isLogin) {
        await this.$router.push({
          name: "Login"
        });
        return;
      }
      await api.problem.saveXML(this.problemId, this.getBlocklyXML());
      await api.problem.submit(this.problemId, this.getBlocklyXML());
    },
    updateBlockly() {
      let xml = this.getBlocklyXML();
      this.sendData = xml;
      localStorage[`p${this.problemId}`] = xml;
    },
  },
  async mounted() {
    this.problemData = await api.problem.getProblemFromId(this.problemId);
    if (Object.values(this.problemData).length === 0) {
      await this.$router.push({
        name: 'Home'
      });
      return;
    }
    this.$store.dispatch('setTitle', `${this.problemId}번 : ${this.problemData.title}`);

    this.recentSubmissionList = await api.submission.getRecentList(this.$store.getters.id, 5);

    Blockly.inject(this.$refs.blockly, this.options);
    let xml = await api.problem.loadXML(this.problemId);
    let localXML = localStorage[`p${this.problemId}`];
    if (typeof localXML === "string") {
      xml = localXML;
      if (!await api.problem.saveXML(this.problemId, xml)) delete localStorage[`p${this.problemId}`];
    }
    if (typeof xml === "string") {
      Blockly.Xml.appendDomToWorkspace(Blockly.Xml.textToDom(xml), Blockly.mainWorkspace);
    }
    Blockly.mainWorkspace.addChangeListener(this.updateBlockly);
    this.saveId = setInterval(async () => {
      if (this.sendData === this.lastData) this.sendData = localStorage[`p${this.problemId}`];
      if (this.sendData !== this.lastData && typeof this.sendData === "string") {
        let ret = await api.problem.saveXML(this.problemId, this.sendData);
        if (!ret) {
          this.lastData = this.sendData;
          if (localStorage[`p${this.problemId}`] !== undefined) delete localStorage[`p${this.problemId}`];
        }
      }
    }, 1000 * 10);
  }
}
</script>
