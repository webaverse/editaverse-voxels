<script>
  import { tick } from 'svelte';
  import Link from './components/link.svelte';
  import Main from './routes/main.svelte';
  import router from './stores/router';
  import 'codemirror/mode/javascript/javascript';
  import 'codemirror/lib/codemirror.css';
  import 'codemirror/theme/monokai.css';

  router.init();

  let component;
  $: switch ($router.id) {
    case '':
      component = Main;
      break;
    default:
      tick().then(() => router.replace('/'));
      break;
  }

  const onContextMenu = (e) => e.preventDefault();
</script>

<svelte:window on:contextmenu={onContextMenu} />

<app>
  <route>
    <svelte:component
      this={component}
      {...($router.params ? { params: $router.params } : {})}
    />
  </route>
</app>


<style>
  app {
    display: block;
    height: 100vh;
  }

  route {
    display: block;
    height: 100vh;
    overflow: overlay;
  }

  toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0 1rem;
    box-sizing: border-box;
    background: #222;
    border-top: 2px solid #000;
  }

  toolbar > div {
    display: flex;
    align-items: center;
  }

  brand {
    letter-spacing: 0.2rem;
  }

  credits {
    border-left: 1px solid #888;
    color: #ccc;
    margin-left: 1em;
    padding-left: 1em;
  }
</style>
