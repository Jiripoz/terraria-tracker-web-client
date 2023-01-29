<script lang="ts">
    export let name: string;
    export let item_progress: number;
    export let research_needed: number;
    export let imageUrl: string;
    export let itemUrl: string;
    let link:string = "https://terraria.wiki.gg/images/"
</script>

<div class="item">
    <div class="top-container">
        <img class="image" src={`${link}${imageUrl}`} alt={itemUrl} />

        <div class="right-upper-box">
            <div class="research-progress">{item_progress}/{research_needed}</div>
            <div class="research-status">Not researched</div>    
        </div>
    </div>
    <div class="name-description">
        <div class="item-name"><h5>{name}</h5></div>
        <div class="caption">descrição etc</div>
    </div>
    
    <div class="bottom-container">
        <div class="item-property">O O O</div>
        <div class="see-recipe">See Recipes</div>
    
    </div>

</div>
<style>
    .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2em;
        gap: 2em;
        width: 352.67px;
        height: 287px;
        box-sizing: border-box;
        background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #111111;
        box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
        border-radius: 1em;
    }
    .top-container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 1em;
        justify-content: space-between;
        width: 100%;
    }
    .image {
        display: flex;
        flex-direction: column;
        align-items: right;
        padding: 0px;
        gap: 1em;
        height: 80px;
        width: 80px;
        object-fit: contain;
     }
     .right-upper-box{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0px;
        gap: 4px;

    }
    .research-progress {
        font-weight: 700;
        font-size: 34px;
        line-height: 51px;
        letter-spacing: 0.0025em;
        color: #111111;

}
    .research-status {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 6px 12px;
        gap: 16px;
        width: auto;
        height: 33px;
        background: #BA1B1D;
        border: 3px solid #BA1B1D;
        border-radius: 66px;
        color: #FFFFFF;
    }
    .name-description {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 0px;
        gap: 10px;
    }
    .item-name {
        margin-top: 0;
        margin-bottom: 0;
    }
    .bottom-container {
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
    .item-property {
    }
    .see-recipe {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 4px 6px;

        width: 105px;
        height: 29px;
        background: #58355E;
        box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        color: #FFFFFF;
    }
</style>
