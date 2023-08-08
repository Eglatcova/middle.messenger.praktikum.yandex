export const template = `<div class="settings-container">
{{{avatar}}}
{{{title}}}
<div class="profile_settings">
  {{{itemEmail}}}
  {{{itemLogin}}}
  {{{itemName}}}
  {{{itemSurname}}}
  {{{itemTelephone}}}
</div>
<div class="profile_links">
  <div class="profile_link-wrapper">
    {{{linkToProfileSettings}}}
  </div>
  <div class="profile_link-wrapper">
    {{{linkToPasswordSettings}}}
  </div>
  <div class="profile_link-wrapper">
    {{{linkLogout}}}
  </div>
</div>

</div>
<div class="profile_messenger-link-wrapper">
{{{linkToMessenger}}}
</div>`;
