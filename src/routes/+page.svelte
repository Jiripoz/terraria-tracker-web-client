<script>
import Highlight from '../lib/components/Highlight.svelte';
import { Tabs, TabList, TabPanel, Tab } from '../lib/components/tabs/tabs';



import {
    overviewStore,
    setupDependencies
} from '../lib/stores/store';
import {
    onMount
} from 'svelte';

onMount(setupDependencies);
</script>

<svelte:head>
    <title>Carlos Piloto Fã Clube</title>
    <meta name="Terraria" content="terraria journey tracker" />
    </svelte:head>

    {#if $overviewStore}
    <div class="highlight-list">
        <div><Highlight {...$overviewStore.progress}></Highlight></div>
        <div><Highlight {...$overviewStore.partially_researched}></Highlight></div>
        <div><Highlight {...$overviewStore.absolute}></Highlight></div>
        <div><Highlight {...$overviewStore.not_researched}></Highlight></div>
        <div><Highlight {...$overviewStore.easy}></Highlight></div>
    </div>
    {/if}
    
    <Tabs>
        <TabList>
            <div class="item-tab">
            <div><Tab><h3>Items</h3></Tab></div>
            <div><Tab><h3>Crafting</h3></Tab></div>
            </div>
        </TabList>
    
        <TabPanel>
        </TabPanel>
    
        <TabPanel>
        </TabPanel>

    </Tabs>    


<style>
.highlight-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: -1em;
    margin-right: -1em;
    margin-top: -1em;

}
.highlight-list>* {
    margin-left: 1em;
    margin-right: 1em;
    margin-top: 1em;

}
.item-tab {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0px;
    margin-top:2em;
    margin-bottom:0px;
    padding: auto;
    }
.item-tab>* {
    width: 365px;
    margin-right:32px;
    margin-left:32px;
    }
.sub-tab {
    display:flex;
    flex-direction: row;
    justify-content: right;
}

</style>
