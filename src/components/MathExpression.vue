<template>
  <mn v-if="typeof props.expression === 'number'">{{ props.expression }}</mn>
  <template v-else>
    <mo
      v-if="
        (props.needsParentheses === NeedsParentheses.WhenHigherPriority &&
          props.priority > props.expression.operation.priority) ||
        (props.needsParentheses === NeedsParentheses.WhenHigherOrSamePriority &&
          props.priority >= props.expression.operation.priority)
      "
      >(
    </mo>
    <template v-if="props.expression.operation === operations.Add">
      <mrow>
        <MathExpression
          :expression="props.expression.left"
          :priority="props.expression.operation.priority"
        />
      </mrow>
      <mo>+</mo>
      <mrow>
        <MathExpression
          :expression="props.expression.right"
          :priority="props.expression.operation.priority"
        />
      </mrow>
    </template>
    <template v-else-if="props.expression.operation === operations.Subtract">
      <mrow>
        <MathExpression
          :expression="props.expression.left"
          :priority="props.expression.operation.priority"
        />
      </mrow>
      <mo>-</mo>
      <mrow>
        <MathExpression
          :expression="props.expression.right"
          :priority="props.expression.operation.priority"
          :needs-parentheses="NeedsParentheses.WhenHigherOrSamePriority"
        />
      </mrow>
    </template>
    <template v-else-if="props.expression.operation === operations.Multiply">
      <mrow>
        <MathExpression
          :expression="props.expression.left"
          :priority="props.expression.operation.priority"
        />
      </mrow>
      <mo>&times;</mo>
      <mrow>
        <MathExpression
          :expression="props.expression.right"
          :priority="props.expression.operation.priority"
        />
      </mrow>
    </template>
    <mfrac v-else-if="props.expression.operation === operations.Divide">
      <mrow>
        <MathExpression
          :expression="props.expression.left"
          :priority="props.expression.operation.priority"
          :needs-parentheses="NeedsParentheses.Never"
        />
      </mrow>
      <mrow>
        <MathExpression
          :expression="props.expression.right"
          :priority="props.expression.operation.priority"
          :needs-parentheses="NeedsParentheses.Never"
        />
      </mrow>
    </mfrac>
    <msup v-else-if="props.expression.operation === operations.Exponent">
      <mrow>
        <MathExpression
          :expression="props.expression.left"
          :priority="props.expression.operation.priority"
        />
      </mrow>
      <mrow>
        <MathExpression
          :expression="props.expression.right"
          :priority="props.expression.operation.priority"
          :needs-parentheses="NeedsParentheses.Never"
        />
      </mrow>
    </msup>
    <template v-else-if="props.expression.operation === operations.Log">
      <msub>
        <mi>log</mi>
        <mrow>
          <MathExpression
            :expression="props.expression.left"
            :priority="props.expression.operation.priority"
          />
        </mrow>
      </msub>
      <mo>(</mo>
      <mrow>
        <MathExpression
          :expression="props.expression.right"
          :priority="props.expression.operation.priority"
          :needs-parentheses="NeedsParentheses.Never"
        />
      </mrow>
      <mo>)</mo>
    </template>
    <mo
      v-if="
        (props.needsParentheses === NeedsParentheses.WhenHigherPriority &&
          props.priority > props.expression.operation.priority) ||
        (props.needsParentheses === NeedsParentheses.WhenHigherOrSamePriority &&
          props.priority >= props.expression.operation.priority)
      "
      >)
    </mo>
  </template>
</template>

<script setup lang="ts">
import * as operations from "../operation";
import type { Expression } from "../solver";

enum NeedsParentheses {
  Never,
  WhenHigherOrSamePriority,
  WhenHigherPriority,
}

const props = withDefaults(
  defineProps<{
    expression: Expression | number;
    priority: number;
    needsParentheses?: NeedsParentheses;
  }>(),
  {
    needsParentheses: NeedsParentheses.WhenHigherPriority,
  },
);
</script>
