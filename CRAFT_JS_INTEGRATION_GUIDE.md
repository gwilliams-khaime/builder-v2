# Craft.js Integration Guide for Website Builder

This document outlines the comprehensive plan and technical details for integrating **Craft.js** into our application to create a robust, bug-free, and standard website builder.

## 1. Introduction & Why Craft.js?

Craft.js is a React framework for building drag-and-drop page editors. Unlike other libraries that give you a pre-made editor, Craft.js provides the **building blocks** (hooks and components) to build *our own* editor with our own UI and logic. This allows for complete customization of the design and behavior, which fits perfectly with our custom `EditorLayout`.

## 2. Core Architecture: How it Works Behind the Scenes

Understanding the "Mental Model" of Craft.js is crucial for avoiding bugs.

### The Nodes
Everything in the editor is a **Node**.
- A Node corresponds to a React component (e.g., `Container`, `Button`, `Text`).
- **Internal State:** Craft.js maintains a flat object/map of all nodes, where keys are unique Node IDs and values contain the node's data (type, props, parent, children, etc.).
- **Serialization:** This flat structure makes it easy to serialize the entire tree into JSON, which is what we save/export.

### The Editor
The `<Editor />` component is the context provider. It holds the entire state of the page being built.
- It manages the list of all Nodes.
- It handles events (drag, drop, click).
- It exposes an API (via `useEditor` hook) to manipulate the state (add node, update props, delete node).

### The Frame
The `<Frame />` is the "canvas" or the editable area.
- It is where the user's design is rendered.
- Unlike a standard React render, the `<Frame />` interrupts the normal rendering to inject Craft.js logic (selection, drag handlers) into our components.

### Rules & Connectors
Craft.js uses **connectors** to attach logic to DOM elements:
- `connect`: Tells Craft.js "This DOM element represents the Node".
- `drag`: Tells Craft.js "Dragging this DOM element should move the Node".

## 3. Integration Plan

We will integrate Craft.js into our existing structure: `src/app/builder` and `src/components/builder`.

### Step 1: Provider Setup
We need to wrap our editor UI with the `<Editor />` provider. This should likely happen in `src/app/builder/page.tsx` or `src/components/builder/EditorLayout/index.tsx`.

**Crucial:** We must pass a `resolver` map to the `<Editor />`. This map contains all the React components that users can drag and drop (e.g., `Container`, `Text`, `Image`).

```tsx
// Example in src/app/builder/page.tsx
import { Editor } from "@craftjs/core";
import { Container, Button, Text } from "@/components/user"; // Our custom components

export default function BuilderPage() {
  return (
    <Editor resolver={{ Container, Button, Text }}>
       <EditorLayout>
          {/* ... */}
       </EditorLayout>
    </Editor>
  );
}
```

### Step 2: The Canvas (Main Area)
Inside our `EditorLayout` (specifically the `main` tag), we will place the `<Frame>`. This is where the magic happens.

```tsx
import { Frame, Element } from "@craftjs/core";

// In the main content area of EditorLayout
<div className="w-full h-full bg-white...">
  <Frame>
    {/* The Root Node of our page */}
    <Element is={Container} canvas>
       <Text text="Welcome to your new site!" />
    </Element>
  </Frame>
</div>
```

### Step 3: User Components (The Building Blocks)
We need to create "User Components". These are standard React components with extra configuration for Craft.js.

**Location:** `src/components/user/` (New directory recommended)

**Example `Button.tsx`:**
```tsx
import { useNode } from "@craftjs/core";

export const Button = ({ children, variant, ...props }) => {
  const { connectors: { connect, drag } } = useNode();
  
  return (
    <button 
      ref={(ref) => connect(drag(ref))} // Enable click (select) and drag
      className={`btn-${variant}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// Configuration for the Editor
Button.craft = {
  displayName: "Button",
  props: { variant: "primary" }, // Default props
  related: {
    settings: ButtonSettings, // The component to render in the Right Panel
  }
};
```

## 4. Settings Panel (Right Panel Integration)

This is how we make the `RightPanel` dynamic.

**Mechanism:**
1. When a user clicks a component in the `Frame`, Craft.js marks it as "selected".
2. The `RightPanel` uses the `useEditor` hook to check which node is currently selected.
3. If a node is selected, we fetch its `related.settings` component (defined in `Button.craft.related.settings` above) and render it.

**Implementation Logic for RightPanel:**
```tsx
import { useEditor } from "@craftjs/core";

export const RightPanel = () => {
  const { selected, actions } = useEditor((state) => {
    // Get the first selected node ID
    const [currentNodeId] = state.events.selected;
    
    // Get the actual Node object and its related settings component
    if (currentNodeId) {
      const { data } = state.nodes[currentNodeId];
      return {
        selected: {
          id: currentNodeId,
          name: data.displayName,
          settings: data.related && data.related.settings,
          props: data.props
        }
      };
    }
  });

  if (!selected) return <div>Select an element to edit</div>;

  // Render the specific settings component for the selected item
  return (
    <div className="p-4">
      <h3>Edit {selected.name}</h3>
      {selected.settings && React.createElement(selected.settings)}
    </div>
  );
};
```

**What is a Settings Component?**
It's a component that uses `useNode` (but connected to the selected node via context) to update props.
```tsx
const ButtonSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props
  }));

  return (
    <input 
      value={props.text} 
      onChange={e => setProp(props => props.text = e.target.value)} 
    />
  );
};
```

## 5. Templates & Initialization

**How to load a template?**
Templates are just JSON strings representing the node tree.
To load a template when the editor starts, we pass the JSON string to the `<Frame>` component.

```tsx
const landingPageTemplate = '{"ROOT":{"type":"Container","props":{...},"nodes":["node1"]}, ...}';

<Frame json={landingPageTemplate}>
  <Element is={Container} canvas> ... </Element>
</Frame>
```

**Important:** If `json` is provided, the children of `<Frame>` are ignored (unless the JSON is empty/invalid).

## 6. Exporting & Publishing

**What is exported?**
When we "Save" or "Publish", we are exporting the **Serialized State**.
`editor.query.serialize()` returns a JSON string.

**The JSON contains:**
- A list of all nodes.
- For each node:
  - `type`: The component name (e.g., "Button").
  - `props`: The current properties (text, colors, etc.).
  - `nodes`: Array of child node IDs.
  - `parent`: The parent node ID.

**Rendering the Live Site:**
To render the website for the end-user (outside the editor), we use the `<Editor>` component simply as a renderer, without the UI overlays.
However, a more optimized approach for the live site is to:
1. Fetch the JSON.
2. Traverse the JSON tree.
3. Render the corresponding React components (`resolver` map) based on the `type` and `props`.
*Craft.js doesn't inherently provide a "static site generator", but the JSON it produces is the blueprint for one.*

## 7. Ensuring a "Standard Website Builder" Experience

To ensure high quality and no bugs:

1.  **Strict Typing:** Use TypeScript for all Props and Settings.
2.  **Error Boundaries:** Wrap user components in Error Boundaries so one bad component doesn't crash the editor.
3.  **Sanitization:** Sanitize inputs in the Settings Panel to prevent XSS or invalid CSS.
4.  **Canvas Constraints:**
    - Use `Element` with `canvas` prop to define strictly where things can be dropped.
    - Don't allow dropping a "Page" inside a "Button". Craft.js allows defining "Rules" (canDrop, canDrag) on components to enforce this.

## 8. Summary of Next Steps

1.  **Setup Context:** Wrap `EditorPage` with `Editor`.
2.  **Create Base Components:** Build `Container`, `Text`, `Image`, `Button` in `src/components/user`.
3.  **Configure Panels:** Connect `LeftPanel` (Toolbox) to drag new items, and `RightPanel` (Settings) to edit selected items.
4.  **Implement Save/Load:** Add buttons to the Header to call `serialize()` and save to DB/LocalState.

This architecture decouples the *Editor UI* (panels, buttons) from the *Content* (user components), making it maintainable and scalable.
