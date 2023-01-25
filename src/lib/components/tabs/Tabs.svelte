<script context="module">
	export const TABS = {};
</script>

<script lang="ts">
	import { setContext, onDestroy } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	type TabID = Record<string, string>;

	const tabs: TabID[] = [];
	const panels: TabID[] = [];
	const selectedTab: Writable<TabID | null> = writable(null);
	const selectedPanel: Writable<TabID | null> = writable(null);

	setContext(TABS, {
		registerTab: (tab: TabID) => {
			tabs.push(tab);
			selectedTab.update(current => current || tab);
			
			onDestroy(() => {
				const i = tabs.indexOf(tab);
				tabs.splice(i, 1);
				selectedTab.update(current => current === tab ? (tabs[i] || tabs[tabs.length - 1]) : current);
			});
		},

		registerPanel: (panel: TabID) => {
			panels.push(panel);
			selectedPanel.update(current => current || panel);
			
			onDestroy(() => {
				const i = panels.indexOf(panel);
				panels.splice(i, 1);
				selectedPanel.update(current => current === panel ? (panels[i] || panels[panels.length - 1]) : current);
			});
		},

		selectTab: (tab: TabID) => {
			const i = tabs.indexOf(tab);
			selectedTab.set(tab);
			selectedPanel.set(panels[i]);
		},

		selectedTab,
		selectedPanel
	});
</script>

<div class="tabs">
	<slot></slot>
</div>