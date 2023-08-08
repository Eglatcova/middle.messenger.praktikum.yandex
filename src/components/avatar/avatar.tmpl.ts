export const template = `{{#if avatar}}
<img
  class="avatar_img"
  src="https://ya-praktikum.tech/api/v2/resources/{{avatar}}"
  alt=""
/>
{{/if}}
{{#if withRedactor}}
{{{button}}}
{{/if}}
{{{popup}}}`;
