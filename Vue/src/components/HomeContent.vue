<script setup lang="ts">

import 'devextreme/dist/css/dx.material.blue.light.compact.css';

import { DxFileManager, DxPermissions } from 'devextreme-vue/file-manager';
import RemoteFileSystemProvider from 'devextreme/file_management/remote_provider';
import { DxLoadPanel } from 'devextreme-vue/load-panel';
import { onMounted, type HtmlHTMLAttributes, ref } from 'vue';

const baseUrl = 'https://localhost:7049/api/';

const fileSystemProvider = new RemoteFileSystemProvider({
  endpointUrl: `${baseUrl}file-manager-azure`,
});

const allowedFileExtensions = ref<string[]>([]);
const loadPanelPosition = { of: '#file-manager' };
const loadPanelVisible = ref(true);
const wrapperClassName = ref<HtmlHTMLAttributes['class']>('');

onMounted(() => {
  fetch(`${baseUrl}file-manager-azure-status?widgetType=fileManager`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((result) => {
      const className = result.active ? 'show-widget' : 'show-message';
      wrapperClassName.value = className;
      loadPanelVisible.value = false;
    })
    .catch((error) => {
      /* eslint-disable no-console */
      console.error('Error fetching Azure status:', error);
      /* eslint-enable no-console */
    });
});

</script>
<template>
  <div
    id="wrapper"
    :class="wrapperClassName"
  >
    <DxLoadPanel
      :position="loadPanelPosition"
      v-model:visible="loadPanelVisible"
    />
    <DxFileManager
      id="file-manager"
      :file-system-provider="fileSystemProvider"
      :allowed-file-extensions="allowedFileExtensions"
    >
      <!-- uncomment the code below to enable file/directory management -->
      <DxPermissions>
        <!--
        :create="true"
        :copy="true"
        :move="true"
        :delete="true"
        :rename="true"
        :upload="true"
        :download="true"
        -->
        :create="true"
      </DxPermissions>
    </DxFileManager>
    <div id="message-box">
      To run the demo, specify your Azure storage account name, access key and container name in the
      <strong>appsettings.json</strong>
      file.
    </div>
  </div>
</template>

<style>
#wrapper #file-manager {
  visibility: hidden;
}

#wrapper #message-box {
  display: none;
}

#wrapper.show-widget #file-manager {
  visibility: visible;
}

#wrapper.show-message #file-manager {
  display: none;
}

#wrapper.show-message #message-box {
  display: block;
  }
</style>
