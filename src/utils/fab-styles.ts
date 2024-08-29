/**
 * Common style object for Floating Action Buttons (FAB) using MUI's sx prop
 *
 * This style utilizes CSS variables for theming consistency and easy customization.
 * It sets the background color and text color for the FAB, including its hover state.
 *
 * @type {import('@mui/system').SxProps}
 */
export const fabStyle = {
    "backgroundColor": "var(--color-opaque-bright)",
    "color": "var(--color-text)",

    "&:hover": {
        backgroundColor: "var(--color-opaque-bright)",
    },
}
