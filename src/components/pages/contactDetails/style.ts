import { createUseStyles } from "react-jss";
import { Theme } from "../../../core/theme";

export const useStyles = createUseStyles(
  ({
    glassBg,
    glassShade,
    bgShade,
    bg,
    link,
    dark,
    transparent,
    lightText,
    danger,
  }: Theme) => {
    const glassEffect = {
      background: glassBg,
      boxShadow: `0 4px 30px ${glassShade}`,
      backdropFilter: "blur(5px)",
      WebkitBackdropFilter: "blur(5px)",
      textAlign: "center",
    };

    return {
      contactDetails: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowY: "auto",
      },
      imgContainer: {
        position: "relative",
        overflow: "hidden",
        backgroundColor: bgShade,
        minHeight: 504,
        height: 504,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      avatarPlaceholderIcon: {
        fontSize: 120,
        color: lightText,
      },
      bottomBlur: {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2,
        width: "100%",
        height: 300,
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        maskImage: `linear-gradient(to top, ${dark} 15%, ${transparent} 100%)`,
        WebkitMaskImage: `linear-gradient(to top, ${dark} 15%, ${transparent} 100%)`,
        pointerEvents: "none",
      },
      topInfoContainer: {
        position: "absolute",
        zIndex: 3,
        bottom: 25,
        left: 20,
      },
      returnBtn: {
        ...glassEffect,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: 15,
        top: 20,
        width: 40,
        height: 40,
        zIndex: 3,
        borderRadius: "50%",
      },
      title: {
        fontWeight: "bold",
        fontSize: 30,
        marginBottom: 20,
      },
      subTopInfoContainer: {
        ...glassEffect,
        padding: 10,
        borderRadius: 8,
      },
      infoContainer: {
        width: "100%",
        backgroundColor: bgShade,
        borderRadius: 10,
        padding: "10px 15px",
      },
      info: {
        borderBottom: `1px solid ${bg}`,
        marginBottom: 8,
        paddingBottom: 8,
      },
      infoData: {
        color: link,
      },
      errorIcon: {
        marginRight: 8,
        color: danger,
      },
    };
  },
);
