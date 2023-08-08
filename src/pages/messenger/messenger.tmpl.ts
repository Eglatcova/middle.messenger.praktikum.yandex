export const template = `<div class="messenger_contacts">
<div class="messenger_contacts-header">
  {{{linkProfile}}}
</div>
<div class="messenger_create-button-wrapper">
  {{{createChatButton}}}
</div>
<div class="messenger_contacts-list">
  {{loadText}}
  {{#each chats}}
    <div data-id="chat_{{@index}}"></div>
  {{/each}}
</div>
</div>

{{{messages}}}
{{{popup}}}
`;
